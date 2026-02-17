import ContactInfoStep, { ContactData, ContactErrors } from '@/components/event/checkout/contact-info-step'
import PaymentMethodStep from '@/components/event/checkout/payment-method-step'
import TicketSelectionStep from '@/components/event/checkout/ticket-selection-step'
import OrderSummaryStep from '@/components/event/checkout/order-summary-step'
import AttendeesStep, { AttendeeErrors } from '@/components/event/checkout/attendees-step'
import { contactSchema, attendeesArraySchema } from '@/components/event/checkout/schemas'
import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { useEvent } from '@/hooks/query/useEvent'
import { useChargeCard } from '@/hooks/query/useCard'
import { useWalletSpend } from '@/hooks/query/useWallet'
import { useCheckoutStore } from '@/store/checkout-store'
import { Ticket, Attendee } from '@/types'
import {
  FeeConfig,
  calculateTotalPrice,
  calculateTotalTickets,
  calculateFees,
  buildPurchaseMetadata,
  buildSelectedTicketItems,
  initializeAttendees,
} from '@/utils/checkout'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState, useMemo, useCallback, useRef } from 'react'
import { Alert, TouchableOpacity, View, ActivityIndicator, Modal, PanResponder, Animated } from 'react-native'
import { usePaystack } from 'react-native-paystack-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'
import SuccessIcon from '@/assets/icons/success.svg'

const CheckoutScreen = () => {
  const { colorScheme } = useColorScheme()
  const { slug } = useLocalSearchParams()
  const router = useRouter()
  const { popup } = usePaystack()
  const resetCheckoutStore = useCheckoutStore((state) => state.reset)
  const paymentChannel = useCheckoutStore((state) => state.paymentChannel)
  const selectedCardId = useCheckoutStore((state) => state.selectedCardId)
  const { mutateAsync: spendWallet } = useWalletSpend()
  const { mutateAsync: chargeCard } = useChargeCard()

  const { data: event } = useEvent(slug as string)

  const tickets: Ticket[] = event?.data?.tickets || []
  const feeConfig: FeeConfig = {
    bearer: event?.data.bearer || 'event',
    ticketFixed: event?.data.ticket_fixed || 100,
    ticketRate: event?.data.ticket_rate || 0.085,
  }

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

  // Payment success
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleClose = useCallback(() => {
    resetCheckoutStore()
    router.back()
  }, [resetCheckoutStore, router])

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

  const processWalletPayment = useCallback(async () => {
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
    })

    const selectedTickets = buildSelectedTicketItems(tickets, quantities)

    try {
      await spendWallet({
        type: 'ticket',
        amount: finalPrice,
        ticketId: selectedTickets[0]?.ticketId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        quantity: selectedTickets.reduce((sum, t) => sum + t.quantity, 0),
        attendees: metadata.attendees,
        ...(promoCode && { coupon: promoCode }),
        ...(metadata.reseller && { reseller: metadata.reseller }),
      })

      setIsProcessing(false)
      setShowSuccess(true)
    } catch (error) {
      setIsProcessing(false)
      Alert.alert('Payment Failed', error instanceof Error ? error.message : 'Wallet payment failed. Please try again.')
    }
  }, [
    contact,
    finalPrice,
    feeConfig.bearer,
    sendToDifferentEmails,
    attendees,
    tickets,
    quantities,
    promoCode,
    spendWallet,
  ])

  const processPaystackPayment = useCallback(() => {
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

    popup.newTransaction({
      email: contact.email,
      amount: finalPrice,
      reference: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      metadata,
      onSuccess: () => {
        setIsProcessing(false)
        setShowSuccess(true)
      },
      onCancel: () => {
        setIsProcessing(false)
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
    tickets,
    quantities,
  ])

  const processSavedCardPayment = useCallback(async () => {
    if (!selectedCardId) {
      Alert.alert('No Card Selected', 'Please select a saved card to continue.')
      return
    }

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
    })

    const selectedTickets = buildSelectedTicketItems(tickets, quantities)

    try {
      await chargeCard({
        cardId: selectedCardId,
        type: 'ticket',
        amount: finalPrice,
        ticketId: selectedTickets[0]?.ticketId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        quantity: selectedTickets.reduce((sum, t) => sum + t.quantity, 0),
        attendees: metadata.attendees,
        ...(promoCode && { coupon: promoCode }),
        ...(metadata.reseller && { reseller: metadata.reseller }),
      })

      setIsProcessing(false)
      setShowSuccess(true)
    } catch (error) {
      setIsProcessing(false)
      Alert.alert(
        'Payment Failed',
        error instanceof Error ? error.message : 'Card payment failed. Please try again.',
      )
    }
  }, [
    selectedCardId,
    contact,
    finalPrice,
    feeConfig.bearer,
    sendToDifferentEmails,
    attendees,
    tickets,
    quantities,
    promoCode,
    chargeCard,
  ])

  const processPayment = useCallback(() => {
    if (paymentChannel === 'wallet') {
      processWalletPayment()
    } else if (paymentChannel === 'saved_card') {
      processSavedCardPayment()
    } else {
      processPaystackPayment()
    }
  }, [paymentChannel, processWalletPayment, processSavedCardPayment, processPaystackPayment])

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

  // Swipe to go back
  const translateX = useRef(new Animated.Value(0)).current
  const handleBackRef = useRef(handleBack)
  handleBackRef.current = handleBack
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dx > 15 && Math.abs(gestureState.dy) < Math.abs(gestureState.dx),
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 80 && gestureState.vx > 0.3) {
          Animated.timing(translateX, {
            toValue: 400,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateX.setValue(0)
            handleBackRef.current()
          })
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start()
        }
      },
    }),
  ).current

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
    if (step === maxStep) {
      if (isProcessing) return 'Processing...'
      if (paymentChannel === 'wallet') return 'Pay with Wallet'
      if (paymentChannel === 'saved_card') return 'Pay with Card'
      return 'Pay'
    }
    return 'Continue'
  }

  const isNextDisabled = (): boolean => {
    if (isProcessing) return true
    if (step === 0) return totalTickets === 0
    return false
  }

  const ProgressBar = () => (
    <View className="flex-row gap-2 px-5 mt-3 mb-2">
      {Array.from({ length: getTotalSteps() }).map((_, i) => (
        <View
          key={i}
          className={`flex-1 h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
          style={{
            shadowColor: i <= step ? '#004cff' : 'transparent',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
          }}
        />
      ))}
    </View>
  )

  const getStepIcon = (): string => {
    if (!sendToDifferentEmails) {
      switch (step) {
        case 0:
          return 'ticket'
        case 1:
          return 'person'
        case 2:
          return 'receipt'
        case 3:
          return 'card'
        default:
          return 'checkmark-circle'
      }
    } else {
      switch (step) {
        case 0:
          return 'ticket'
        case 1:
          return 'person'
        case 2:
          return 'people'
        case 3:
          return 'receipt'
        case 4:
          return 'card'
        default:
          return 'checkmark-circle'
      }
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-card">
      {/* Header */}
      <View className="bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-gray-700">
        <View className="flex-row justify-between items-center px-5 py-4">
          <TouchableOpacity
            onPress={handleBack}
            className="w-11 h-11 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-card"
            activeOpacity={0.7}
          >
            <Ionicons name={step === 0 ? 'close' : 'arrow-back'} size={22} color={colorScheme === 'dark' ? '#e5e7eb' : '#1f2937'} />
          </TouchableOpacity>

          <View className="items-center flex-1 mx-4">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name={getStepIcon() as any} size={16} color={Colors.primary} />
              </View>
              <ThemedText className="text-lg font-bold text-gray-900 dark:text-gray-100">{getStepTitle()}</ThemedText>
            </View>
            <ThemedText className="text-xs text-gray-400">
              Step {step + 1} of {getTotalSteps()}
            </ThemedText>
          </View>

          <View className="w-11" />
        </View>
        <ProgressBar />
      </View>

      {/* Content — swipe right to go back */}
      <Animated.View
        className="flex-1"
        style={{ transform: [{ translateX }] }}
        {...panResponder.panHandlers}
      >
        {renderStep()}
      </Animated.View>

      {/* Footer */}
      <View className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-dark-bg" style={{ paddingBottom: 32 }}>
        {step > 0 && (
          <View className="flex-row justify-between items-center mb-4">
            <ThemedText className="text-gray-500 dark:text-gray-400 font-medium">Total Amount</ThemedText>
            <Currency className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {(sendToDifferentEmails ? step >= 3 : step >= 2) ? finalPrice : totalPrice}
            </Currency>
          </View>
        )}

        <TouchableOpacity
          onPress={handleNext}
          className={`w-full py-4 rounded-2xl flex-row items-center justify-center gap-2 ${isNextDisabled() ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary'}`}
          disabled={isNextDisabled()}
          activeOpacity={0.8}
          style={{
            shadowColor: isNextDisabled() ? 'transparent' : '#004cff',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: isNextDisabled() ? 0 : 4,
          }}
        >
          {isProcessing && <ActivityIndicator color="white" size="small" />}
          <ThemedText className="text-white font-bold text-base">{getButtonText()}</ThemedText>
          {step === 0 && totalPrice > 0 && (
            <>
              <ThemedText className="text-white/60 font-bold">•</ThemedText>
              <Currency className="text-white font-bold text-base">{totalPrice}</Currency>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Dialog */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="bg-white dark:bg-dark-bg rounded-3xl w-full max-w-sm overflow-hidden">
            {/* Success Header with Gradient */}
            <View className="bg-gradient-to-br from-green-400 to-emerald-500 p-8 items-center">
              <View
                className="w-full h-44"
              >
                <SuccessIcon style={{ width: '100%', height: '100%' }} />
              </View>
              <ThemedText className="text-black dark:text-white text-2xl font-bold mb-2">Payment Successful!</ThemedText>
              <ThemedText className="text-black/90 dark:text-white/90 text-center text-sm">
                Your tickets have been purchased
              </ThemedText>
            </View>

            {/* Content */}
            <View className="p-6">

              {/* Action Buttons */}
              <TouchableOpacity
                onPress={() => {
                  setShowSuccess(false)
                  resetCheckoutStore()
                  router.replace('/(secured)/(main)/passes')
                }}
                className="w-full py-4 rounded-2xl bg-primary items-center mb-3"
                activeOpacity={0.8}
                style={{
                  shadowColor: '#004cff',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="ticket-outline" size={20} color="#ffffff" />
                  <ThemedText className="text-white font-bold text-base">View My Tickets</ThemedText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowSuccess(false)
                  resetCheckoutStore()
                  router.replace('/(secured)/(main)/home')
                }}
                className="w-full py-4 rounded-2xl items-center"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="home-outline" size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <ThemedText className="font-bold text-base text-gray-600 dark:text-gray-300">Back to Home</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default CheckoutScreen
