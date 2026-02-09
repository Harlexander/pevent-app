import { ThemedText } from '@/components/themed-text'
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
import { Ticket, Attendee, TicketPaymentRequest, TicketPurchaseMetadata, TicketItem } from '@/types'
import Currency from '../currency'

export type BearerType = 'user' | 'event' | 'split'

export interface FeeConfig {
    bearer: BearerType;
    ticketRate: number;
    ticketFixed: number;
}

interface TicketsDialogProps {
    visible: boolean;
    onClose: () => void;
    tickets: Ticket[];
    feeConfig: FeeConfig;
    onCheckout?: (request: TicketPaymentRequest) => Promise<void>;
    callbackUrl?: string;
}

const TicketsModal = ({
    visible,
    onClose,
    tickets,
    feeConfig = { bearer: 'event', ticketRate: 0, ticketFixed: 0 },
    onCheckout,
    callbackUrl = 'pevent://payment/callback'
}: TicketsDialogProps) => {
    const [step, setStep] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)

    // Step 1: Selection
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    // Step 2: Contact
    const [contact, setContact] = useState<ContactData>({
        firstName: '', lastName: '', email: '', mobile: ''
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

    // Step 5: Payment
    const [paymentMethod, setPaymentMethod] = useState('card')

    const updateQuantity = useCallback((id: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[id] || 0
            const ticket = tickets.find(t => t.id === id)
            const next = current + delta

            if (next < 0) return prev
            if (ticket?.maxPerUser && next > ticket.maxPerUser) return prev
            if (ticket && next > ticket.volume) return prev

            return { ...prev, [id]: next }
        })
    }, [tickets])

    const totalPrice = useMemo(() =>
        tickets.reduce((sum, ticket) => sum + (ticket.price * (quantities[ticket.id] || 0)), 0),
        [tickets, quantities]
    )

    const totalTickets = useMemo(() =>
        Object.values(quantities).reduce((a, b) => a + b, 0),
        [quantities]
    )

    // Calculate fees per ticket: (price * rate) + fixed
    const totalFees = useMemo(() => {
        const { bearer, ticketRate, ticketFixed } = feeConfig

        // If event pays all fees, customer pays nothing
        if (bearer === 'event') return 0

        // Calculate fee for each ticket type
        let fees = 0
        tickets.forEach(ticket => {
            const qty = quantities[ticket.id] || 0
            if (qty > 0) {
                const feePerTicket = (ticket.price * ticketRate) + ticketFixed
                fees += feePerTicket * qty
            }
        })

        // If split, customer pays half
        if (bearer === 'split') return Math.ceil(fees / 2)

        // Customer (user) pays all
        return fees
    }, [tickets, quantities, feeConfig])

    console.log(totalFees)

    const subtotalAfterDiscount = useMemo(() =>
        Math.max(0, totalPrice - appliedDiscount),
        [totalPrice, appliedDiscount]
    )

    const finalPrice = useMemo(() =>
        subtotalAfterDiscount + totalFees,
        [subtotalAfterDiscount, totalFees]
    )

    // Build ticket items array for the request
    const selectedTicketItems = useMemo((): TicketItem[] =>
        tickets
            .filter(t => quantities[t.id] > 0)
            .map(t => ({
                ticketId: t.id,
                name: t.name,
                quantity: quantities[t.id],
                price: t.price,
                subtotal: t.price * quantities[t.id],
            })),
        [tickets, quantities]
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
        setPaymentMethod('card')
        setIsProcessing(false)
    }, [])

    const validateContact = useCallback((): boolean => {
        const result = contactSchema.safeParse(contact)
        if (!result.success) {
            const errors: ContactErrors = {}
            result.error.errors.forEach((err) => {
                const field = err.path[0] as keyof ContactErrors
                errors[field] = err.message
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
            result.error.errors.forEach((err) => {
                const index = err.path[0] as number
                const field = err.path[1] as keyof AttendeeErrors
                if (typeof index === 'number' && errors[index]) {
                    errors[index][field] = err.message
                }
            })
            setAttendeesErrors(errors)
            return false
        }
        setAttendeesErrors([])
        return true
    }, [attendees])

    const setAttendeeAtIndex = useCallback((index: number, data: Attendee) => {
        setAttendees(prev => {
            const updated = [...prev]
            updated[index] = data
            return updated
        })
    }, [])

    const handleClose = useCallback(() => {
        resetModal()
        onClose()
    }, [resetModal, onClose])

    const buildPaymentRequest = useCallback((): TicketPaymentRequest => {
        const metadata: TicketPurchaseMetadata = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            amount: finalPrice,
            purpose: 'ticket',
            tickets: selectedTicketItems,
            totalQuantity: totalTickets,
            bearer: 'account',
            ...(sendToDifferentEmails && attendees.length > 0 && { attendees }),
            ...(promoCode && { coupon: promoCode }),
        }

        return {
            email: contact.email,
            amount: finalPrice * 100, // Convert to kobo
            callback_url: callbackUrl,
            metadata,
        }
    }, [contact, finalPrice, selectedTicketItems, totalTickets, sendToDifferentEmails, attendees, promoCode, callbackUrl])

    const handleNext = useCallback(async () => {
        const maxStep = sendToDifferentEmails ? 4 : 3

        // Validate current step before proceeding
        if (step === 1) {
            if (!validateContact()) return
        }

        if (sendToDifferentEmails && step === 2) {
            if (!validateAttendees()) return
        }

        if (step < maxStep) {
            // If moving past contact step and sending to different emails, initialize attendees
            if (step === 1 && sendToDifferentEmails && attendees.length === 0) {
                // Create attendees linked to each ticket type
                const initialAttendees: Attendee[] = []
                tickets.forEach(ticket => {
                    const qty = quantities[ticket.id] || 0
                    for (let i = 0; i < qty; i++) {
                        initialAttendees.push({
                            firstName: '',
                            lastName: '',
                            email: '',
                            ticketId: ticket.id,
                            ticketName: ticket.name,
                        })
                    }
                })
                setAttendees(initialAttendees)
                setAttendeesErrors([])
            }
            setStep(step + 1)
        } else {
            // Process Payment
            setIsProcessing(true)
            try {
                const paymentRequest = buildPaymentRequest()
                if (onCheckout) {
                    await onCheckout(paymentRequest)
                } else {
                    console.log('Payment Request:', JSON.stringify(paymentRequest, null, 2))
                }
                handleClose()
            } catch (error) {
                console.error('Payment failed:', error)
            } finally {
                setIsProcessing(false)
            }
        }
    }, [step, sendToDifferentEmails, attendees, tickets, quantities, buildPaymentRequest, onCheckout, handleClose, validateContact, validateAttendees])

    const handleBack = useCallback(() => {
        if (step > 0) setStep(step - 1)
        else handleClose()
    }, [step, handleClose])

    const updateAttendee = useCallback((index: number, field: keyof Attendee, value: string) => {
        setAttendees(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], [field]: value }
            return updated
        })
    }, [])

    const getStepIndex = useCallback((actualStep: number) => {
        // Map actual step to display step based on whether attendees step is shown
        if (!sendToDifferentEmails && actualStep > 1) {
            return actualStep + 1
        }
        return actualStep
    }, [sendToDifferentEmails])

    const renderStep = () => {
        if (!sendToDifferentEmails) {
            // Flow without attendees: Selection -> Contact -> Summary -> Payment
            switch (step) {
                case 0: return <TicketSelectionStep quantities={quantities} onUpdateQuantity={updateQuantity} tickets={tickets} />
                case 1: return (
                    <ContactInfoStep
                        data={contact}
                        errors={contactErrors}
                        onChange={(k, v) => {
                            setContact(prev => ({ ...prev, [k]: v }))
                            if (contactErrors[k]) {
                                setContactErrors(prev => ({ ...prev, [k]: undefined }))
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
                case 2: return (
                    <OrderSummaryStep
                        quantities={quantities}
                        totalPrice={totalPrice}
                        discount={appliedDiscount}
                        fees={totalFees}
                        promoCode={promoCode}
                        onPromoCodeChange={setPromoCode}
                        onApplyPromo={() => {/* TODO: API call to validate promo */}}
                        tickets={tickets}
                    />
                )
                case 3: return <PaymentMethodStep selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />
                default: return null
            }
        } else {
            // Flow with attendees: Selection -> Contact -> Attendees -> Summary -> Payment
            switch (step) {
                case 0: return <TicketSelectionStep quantities={quantities} onUpdateQuantity={updateQuantity} tickets={tickets} />
                case 1: return (
                    <ContactInfoStep
                        data={contact}
                        errors={contactErrors}
                        onChange={(k, v) => {
                            setContact(prev => ({ ...prev, [k]: v }))
                            if (contactErrors[k]) {
                                setContactErrors(prev => ({ ...prev, [k]: undefined }))
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
                case 2: return (
                    <AttendeesStep
                        attendees={attendees}
                        errors={attendeesErrors}
                        onUpdateAttendee={(index, field, value) => {
                            updateAttendee(index, field, value)
                            if (attendeesErrors[index]?.[field]) {
                                setAttendeesErrors(prev => {
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
                case 3: return (
                    <OrderSummaryStep
                        quantities={quantities}
                        totalPrice={totalPrice}
                        discount={appliedDiscount}
                        fees={totalFees}
                        promoCode={promoCode}
                        onPromoCodeChange={setPromoCode}
                        onApplyPromo={() => {/* TODO: API call to validate promo */}}
                        tickets={tickets}
                    />
                )
                case 4: return <PaymentMethodStep selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />
                default: return null
            }
        }
    }

    const getStepTitle = () => {
        if (!sendToDifferentEmails) {
            switch (step) {
                case 0: return 'Select Tickets'
                case 1: return 'Contact Info'
                case 2: return 'Order Summary'
                case 3: return 'Payment'
                default: return ''
            }
        } else {
            switch (step) {
                case 0: return 'Select Tickets'
                case 1: return 'Contact Info'
                case 2: return 'Attendee Details'
                case 3: return 'Order Summary'
                case 4: return 'Payment'
                default: return ''
            }
        }
    }

    const getTotalSteps = () => sendToDifferentEmails ? 5 : 4

    const getButtonText = () => {
        const maxStep = sendToDifferentEmails ? 4 : 3

        if (step === 0) return totalPrice > 0 ? `Continue` : 'Select tickets'
        if (step === maxStep) return isProcessing ? 'Processing...' : `Pay`
        return 'Continue'
    }

    const isNextDisabled = () => {
        if (isProcessing) return true
        if (step === 0) return totalTickets === 0
        return false
    }

    // Progress indicator
    const ProgressBar = () => (
        <View className='flex-row gap-1.5 px-5 mt-2'>
            {Array.from({ length: getTotalSteps() }).map((_, i) => (
                <View
                    key={i}
                    className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'}`}
                />
            ))}
        </View>
    )

    return (
        <UIModal isVisible={visible} close={handleClose}>
            <View className='bg-white rounded-t-3xl overflow-hidden h-[75%]'>
                {/* Header */}
                <View className='border-b border-gray-100'>
                    <View className='flex-row justify-between items-center p-4'>
                        <TouchableOpacity
                            onPress={handleBack}
                            className='w-10 h-10 items-center justify-center rounded-full bg-gray-50'
                        >
                            <Ionicons name={step === 0 ? "close" : "arrow-back"} size={20} color="black" />
                        </TouchableOpacity>

                        <View className='items-center'>
                            <ThemedText className='text-lg font-bold'>{getStepTitle()}</ThemedText>
                            <ThemedText className='text-xs text-gray-400'>
                                Step {step + 1} of {getTotalSteps()}
                            </ThemedText>
                        </View>

                        <View className='w-10' />
                    </View>
                    <ProgressBar />
                </View>

                {/* Content */}
                <View className='flex-1'>
                    {renderStep()}
                </View>

                {/* Footer */}
                <View className='p-4 border-t border-gray-100 pb-8 bg-white safe-bottom'>
                    {/* Price summary in footer - show fees only in Order Summary and Payment steps */}
                    {step > 0 && (
                        <View className='flex-row justify-between items-center mb-3'>
                            <ThemedText className='text-gray-500'>Total</ThemedText>
                            <Currency className='text-xl font-bold'>
                                {(sendToDifferentEmails ? step >= 3 : step >= 2) ? finalPrice : totalPrice}
                            </Currency>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleNext}
                        className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-2 ${isNextDisabled() ? 'bg-gray-300' : 'bg-primary'}`}
                        disabled={isNextDisabled()}
                    >
                        {isProcessing && <ActivityIndicator color="white" size="small" />}
                        <ThemedText className='text-white font-bold text-base'>{getButtonText()}</ThemedText>
                        {step === 0 && totalPrice > 0 && (
                            <>
                                <ThemedText className='text-white/60 font-bold'>•</ThemedText>
                                <Currency className='text-white font-bold text-base'>{totalPrice}</Currency>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </UIModal>
    )
}

export default TicketsModal