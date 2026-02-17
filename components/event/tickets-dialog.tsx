import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useMemo, useCallback } from 'react'
import { TouchableOpacity, View, ActivityIndicator } from 'react-native'
import UIModal from '../UIModal'
import ContactInfoStep, { ContactData, ContactErrors } from './checkout/contact-info-step'
import PaymentMethodStep from './checkout/payment-method-step'
import TicketSelectionStep from './checkout/ticket-selection-step'
import OrderSummaryStep from './checkout/order-summary-step'
import AttendeesStep, { AttendeeErrors } from './checkout/attendees-step'
import { contactSchema, attendeesArraySchema } from './checkout/schemas'
import { Ticket, Attendee } from '@/types'
import Currency from '../currency'
import { usePaystack } from 'react-native-paystack-webview'
import { useCheckoutStore } from '@/store/checkout-store'
import {
    FeeConfig,
    calculateTotalPrice,
    calculateTotalTickets,
    calculateFees,
    buildSelectedTicketItems,
    buildPurchaseMetadata,
    initializeAttendees,
} from '@/utils/checkout'

export type { BearerType, FeeConfig } from '@/utils/checkout'

interface TicketsDialogProps {
    visible: boolean
    onClose: () => void
    tickets: Ticket[]
    feeConfig: FeeConfig
    onSuccess?: () => void
    onCancel?: () => void
}

const TicketsModal = ({
    visible,
    onClose,
    tickets,
    feeConfig = { bearer: 'event', ticketRate: 0, ticketFixed: 0 },
    onSuccess,
    onCancel,
}: TicketsDialogProps) => {
    const { popup } = usePaystack()
    const { colorScheme } = useColorScheme()
    const resetCheckoutStore = useCheckoutStore((state) => state.reset)

    const [step, setStep] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)

    // Step 1: Selection
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    // Step 2: Contact
    const [contact, setContact] = useState<ContactData>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
    })
    const [contactErrors, setContactErrors] = useState<ContactErrors>({})
    const [useDefaultInfo, setUseDefaultInfo] = useState(false)

    // Step 3: Attendees (optional)
    const [sendToDifferentEmails, setSendToDifferentEmails] = useState(false)
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [attendeesErrors, setAttendeesErrors] = useState<AttendeeErrors[]>([])

    // Step 4: Order Summary
    const [promoCode, setPromoCode] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState(0)

    const updateQuantity = useCallback(
        (id: string, delta: number) => {
            setQuantities((prev) => {
                const current = prev[id] || 0
                const ticket = tickets.find((t) => t.id === id)
                const next = current + delta

                if (next < 0) return prev
                if (ticket?.maxPerUser && next > ticket.maxPerUser) return prev
                if (ticket && next > ticket.volume) return prev

                return { ...prev, [id]: next }
            })
        },
        [tickets],
    )

    const totalPrice = useMemo(() => calculateTotalPrice(tickets, quantities), [tickets, quantities])

    const totalTickets = useMemo(() => calculateTotalTickets(quantities), [quantities])

    const totalFees = useMemo(
        () => calculateFees(tickets, quantities, feeConfig),
        [tickets, quantities, feeConfig],
    )

    const subtotalAfterDiscount = useMemo(
        () => Math.max(0, totalPrice - appliedDiscount),
        [totalPrice, appliedDiscount],
    )

    const finalPrice = useMemo(
        () => subtotalAfterDiscount + totalFees,
        [subtotalAfterDiscount, totalFees],
    )

    const selectedTicketItems = useMemo(
        () => buildSelectedTicketItems(tickets, quantities),
        [tickets, quantities],
    )

    const resetModal = useCallback(() => {
        setStep(0)
        setQuantities({})
        setContact({ firstName: '', lastName: '', email: '', mobile: '' })
        setContactErrors({})
        setUseDefaultInfo(false)
        setSendToDifferentEmails(false)
        setAttendees([])
        setAttendeesErrors([])
        setPromoCode('')
        setAppliedDiscount(0)
        setIsProcessing(false)
        resetCheckoutStore()
    }, [resetCheckoutStore])

    const validateContact = useCallback((): boolean => {
        const result = contactSchema.safeParse(contact)
        if (!result.success) {
            const errors: ContactErrors = {}
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof ContactErrors
                errors[field] = issue.message
            })
            setContactErrors(errors)
            return false
        }
        setContactErrors({})
        return true
    }, [contact])

    const validateAttendees = useCallback((): boolean => {
        const result = attendeesArraySchema.safeParse(attendees)
        if (!result.success) {
            const errors: AttendeeErrors[] = attendees.map(() => ({}))
            result.error.issues.forEach((issue) => {
                const index = issue.path[0] as number
                const field = issue.path[1] as keyof AttendeeErrors
                if (typeof index === 'number' && errors[index]) {
                    errors[index][field] = issue.message
                }
            })
            setAttendeesErrors(errors)
            return false
        }
        setAttendeesErrors([])
        return true
    }, [attendees])

    const setAttendeeAtIndex = useCallback((index: number, data: Attendee) => {
        setAttendees((prev) => {
            const updated = [...prev]
            updated[index] = data
            return updated
        })
    }, [])

    const handleClose = useCallback(() => {
        resetModal()
        onClose()
    }, [resetModal, onClose])

    const processPayment = useCallback(() => {
        setIsProcessing(true)

        const metadata = buildPurchaseMetadata({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            finalPrice,
            bearer: feeConfig.bearer,
            sendToDifferentEmails,
            attendees,
            tickets,
            quantities,
            promoCode,
        });

        popup.checkout({
            email: contact.email,
            amount: finalPrice * 100,
            metadata,
            onSuccess: () => {
                setIsProcessing(false)
                onSuccess?.()
                handleClose()
            },
            onCancel: () => {
                setIsProcessing(false)
                onCancel?.()
            },
        })
    }, [
        contact,
        finalPrice,
        feeConfig.bearer,
        sendToDifferentEmails,
        attendees,
        promoCode,
        popup,
        onSuccess,
        onCancel,
        handleClose,
    ])

    const handleNext = useCallback(() => {
        const maxStep = sendToDifferentEmails ? 4 : 3

        if (step === 1 && !validateContact()) return
        if (sendToDifferentEmails && step === 2 && !validateAttendees()) return

        if (step < maxStep) {
            if (step === 1 && sendToDifferentEmails && attendees.length === 0) {
                setAttendees(initializeAttendees(tickets, quantities))
                setAttendeesErrors([])
            }
            setStep(step + 1)
        } else {
            processPayment()
        }
    }, [
        step,
        sendToDifferentEmails,
        attendees.length,
        tickets,
        quantities,
        processPayment,
        validateContact,
        validateAttendees,
    ])

    const handleBack = useCallback(() => {
        if (step > 0) setStep(step - 1)
        else handleClose()
    }, [step, handleClose])

    const updateAttendee = useCallback((index: number, field: keyof Attendee, value: string) => {
        setAttendees((prev) => {
            const updated = [...prev]
            updated[index] = { ...updated[index], [field]: value }
            return updated
        })
    }, [])

    const renderStep = () => {
        const contactStep = (
            <ContactInfoStep
                data={contact}
                errors={contactErrors}
                onChange={(k: keyof ContactData, v: string) => {
                    setContact((prev) => ({ ...prev, [k]: v }))
                    if (contactErrors[k]) {
                        setContactErrors((prev) => ({ ...prev, [k]: undefined }))
                    }
                }}
                onSetContact={setContact}
                sendToDifferentEmails={sendToDifferentEmails}
                onToggleSendToDifferent={setSendToDifferentEmails}
                totalTickets={totalTickets}
                useDefaultInfo={useDefaultInfo}
                onToggleUseDefault={setUseDefaultInfo}
            />
        )

        const orderSummary = (
            <OrderSummaryStep
                quantities={quantities}
                totalPrice={totalPrice}
                discount={appliedDiscount}
                fees={totalFees}
                promoCode={promoCode}
                onPromoCodeChange={setPromoCode}
                onApplyPromo={() => {
                    /* TODO: API call to validate promo */
                }}
                tickets={tickets}
            />
        )

        if (!sendToDifferentEmails) {
            switch (step) {
                case 0:
                    return (
                        <TicketSelectionStep
                            quantities={quantities}
                            onUpdateQuantity={updateQuantity}
                            tickets={tickets}
                        />
                    )
                case 1:
                    return contactStep
                case 2:
                    return orderSummary
                case 3:
                    return <PaymentMethodStep />
                default:
                    return null
            }
        } else {
            switch (step) {
                case 0:
                    return (
                        <TicketSelectionStep
                            quantities={quantities}
                            onUpdateQuantity={updateQuantity}
                            tickets={tickets}
                        />
                    )
                case 1:
                    return contactStep
                case 2:
                    return (
                        <AttendeesStep
                            attendees={attendees}
                            errors={attendeesErrors}
                            onUpdateAttendee={(index: number, field: keyof Attendee, value: string) => {
                                updateAttendee(index, field, value)
                                if (attendeesErrors[index]?.[field as keyof AttendeeErrors]) {
                                    setAttendeesErrors((prev) => {
                                        const updated = [...prev]
                                        if (updated[index]) {
                                            updated[index] = { ...updated[index], [field]: undefined }
                                        }
                                        return updated
                                    })
                                }
                            }}
                            onSetAttendee={setAttendeeAtIndex}
                            totalTickets={totalTickets}
                            contactData={contact}
                        />
                    )
                case 3:
                    return orderSummary
                case 4:
                    return <PaymentMethodStep />
                default:
                    return null
            }
        }
    }

    const getStepTitle = (): string => {
        if (!sendToDifferentEmails) {
            switch (step) {
                case 0:
                    return 'Select Tickets'
                case 1:
                    return 'Contact Info'
                case 2:
                    return 'Order Summary'
                case 3:
                    return 'Payment'
                default:
                    return ''
            }
        } else {
            switch (step) {
                case 0:
                    return 'Select Tickets'
                case 1:
                    return 'Contact Info'
                case 2:
                    return 'Attendee Details'
                case 3:
                    return 'Order Summary'
                case 4:
                    return 'Payment'
                default:
                    return ''
            }
        }
    }

    const getTotalSteps = () => (sendToDifferentEmails ? 5 : 4)

    const getButtonText = (): string => {
        const maxStep = sendToDifferentEmails ? 4 : 3

        if (step === 0) return totalPrice > 0 ? 'Continue' : 'Select tickets'
        if (step === maxStep) return isProcessing ? 'Processing...' : 'Pay'
        return 'Continue'
    }

    const isNextDisabled = (): boolean => {
        if (isProcessing) return true
        if (step === 0) return totalTickets === 0
        return false
    }

    const ProgressBar = () => (
        <View className="flex-row gap-1.5 px-5 mt-2">
            {Array.from({ length: getTotalSteps() }).map((_, i) => (
                <View
                    key={i}
                    className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
            ))}
        </View>
    )

    return (
        <UIModal isVisible={visible} close={handleClose}>
            <View className="bg-white dark:bg-dark-bg rounded-t-3xl overflow-hidden h-[75%]">
                {/* Header */}
                <View className="border-b border-gray-100 dark:border-gray-700">
                    <View className="flex-row justify-between items-center p-4">
                        <TouchableOpacity
                            onPress={handleBack}
                            className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-dark-card"
                        >
                            <Ionicons
                                name={step === 0 ? 'close' : 'arrow-back'}
                                size={20}
                                color={colorScheme === 'dark' ? '#e5e7eb' : 'black'}
                            />
                        </TouchableOpacity>

                        <View className="items-center">
                            <ThemedText className="text-lg font-bold text-black dark:text-white">{getStepTitle()}</ThemedText>
                            <ThemedText className="text-xs text-gray-400">
                                Step {step + 1} of {getTotalSteps()}
                            </ThemedText>
                        </View>

                        <View className="w-10" />
                    </View>
                    <ProgressBar />
                </View>

                {/* Content */}
                <View className="flex-1">{renderStep()}</View>

                {/* Footer */}
                <View className="p-4 border-t border-gray-100 dark:border-gray-700 pb-8 bg-white dark:bg-dark-bg safe-bottom">
                    {step > 0 && (
                        <View className="flex-row justify-between items-center mb-3">
                            <ThemedText className="text-gray-500 dark:text-gray-400">Total</ThemedText>
                            <Currency className="text-xl font-bold">
                                {(sendToDifferentEmails ? step >= 3 : step >= 2)
                                    ? finalPrice
                                    : totalPrice}
                            </Currency>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleNext}
                        className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-2 ${isNextDisabled() ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary'}`}
                        disabled={isNextDisabled()}
                    >
                        {isProcessing && <ActivityIndicator color="white" size="small" />}
                        <ThemedText className="text-white font-bold text-base">
                            {getButtonText()}
                        </ThemedText>
                        {step === 0 && totalPrice > 0 && (
                            <>
                                <ThemedText className="text-white/60 font-bold">•</ThemedText>
                                <Currency className="text-white font-bold text-base">
                                    {totalPrice}
                                </Currency>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </UIModal>
    )
}

export default TicketsModal
