import Input from '@/components/ui/input'
import { ThemedText } from '@/components/themed-text'
import { Attendee } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useCallback, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { ContactData } from './contact-info-step'

export interface AttendeeErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
}

interface AttendeesStepProps {
    attendees: Attendee[];
    errors?: AttendeeErrors[];
    onUpdateAttendee: (index: number, field: keyof Attendee, value: string) => void;
    onSetAttendee?: (index: number, data: Attendee) => void;
    totalTickets: number;
    contactData: ContactData;
}

const AttendeesStep = ({ attendees, errors = [], onUpdateAttendee, onSetAttendee, contactData }: AttendeesStepProps) => {
    const [useSameAsContact, setUseSameAsContact] = useState<Record<number, boolean>>({})

    const handleToggleSameAsContact = useCallback((index: number, attendee: Attendee) => {
        const newValue = !useSameAsContact[index]
        setUseSameAsContact(prev => ({ ...prev, [index]: newValue }))

        if (newValue && onSetAttendee) {
            onSetAttendee(index, {
                firstName: contactData.firstName,
                lastName: contactData.lastName,
                email: contactData.email,
                ticketId: attendee.ticketId,
                ticketName: attendee.ticketName,
            })
        }
    }, [useSameAsContact, contactData, onSetAttendee])

    const isLocked = (index: number) => useSameAsContact[index] || false

    // Group attendees by ticket type for display
    const groupedAttendees = useMemo(() => {
        const groups: { ticketId: string; ticketName: string; attendees: { attendee: Attendee; index: number }[] }[] = []

        attendees.forEach((attendee, index) => {
            const existingGroup = groups.find(g => g.ticketId === attendee.ticketId)
            if (existingGroup) {
                existingGroup.attendees.push({ attendee, index })
            } else {
                groups.push({
                    ticketId: attendee.ticketId,
                    ticketName: attendee.ticketName || '',
                    attendees: [{ attendee, index }]
                })
            }
        })

        return groups
    }, [attendees])

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className='p-5 gap-6'>
                <View className='flex-row items-center gap-2 bg-blue-50 p-3 rounded-xl'>
                    <Ionicons name="information-circle" size={20} color="#3b82f6" />
                    <ThemedText className='text-blue-600 text-sm flex-1'>
                        Each attendee will receive their ticket via email
                    </ThemedText>
                </View>

                {groupedAttendees.map((group) => (
                    <View key={group.ticketId} className='gap-4'>
                        {/* Ticket Type Header */}
                        <View className='flex-row items-center gap-2 bg-gray-100 p-3 rounded-xl'>
                            <Ionicons name="ticket-outline" size={18} color="#374151" />
                            <ThemedText className='font-semibold text-gray-700'>{group.ticketName}</ThemedText>
                            <View className='bg-gray-200 px-2 py-0.5 rounded-full ml-auto'>
                                <ThemedText className='text-xs text-gray-600 font-medium'>
                                    {group.attendees.length} {group.attendees.length === 1 ? 'ticket' : 'tickets'}
                                </ThemedText>
                            </View>
                        </View>

                        {group.attendees.map(({ attendee, index }, groupIndex) => (
                            <View key={index} className='gap-4 ml-2 pl-4 border-l-2 border-gray-200'>
                                <View className='flex-row items-center justify-between'>
                                    <View className='flex-row items-center gap-2'>
                                        <View className='w-7 h-7 rounded-full bg-primary items-center justify-center'>
                                            <ThemedText className='text-white font-bold text-sm'>{groupIndex + 1}</ThemedText>
                                        </View>
                                        <ThemedText className='font-bold text-base'>Attendee {groupIndex + 1}</ThemedText>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleToggleSameAsContact(index, attendee)}
                                    className={`flex-row items-center gap-3 p-3 rounded-xl border ${isLocked(index) ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-transparent'}`}
                                    activeOpacity={0.7}
                                >
                                    <View className={`w-5 h-5 rounded border-2 items-center justify-center ${isLocked(index) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                        {isLocked(index) && <Ionicons name="checkmark" size={14} color="white" />}
                                    </View>
                                    <ThemedText className={`text-sm flex-1 ${isLocked(index) ? 'text-primary font-medium' : 'text-gray-600'}`}>
                                        Same as contact info ({contactData.firstName} {contactData.lastName})
                                    </ThemedText>
                                </TouchableOpacity>

                                <View className='flex-row gap-3'>
                                    <View className='flex-1'>
                                        <Input
                                            label="First Name"
                                            placeholder="John"
                                            value={attendee.firstName}
                                            onChangeText={(text) => onUpdateAttendee(index, 'firstName', text)}
                                            editable={!isLocked(index)}
                                            error={errors[index]?.firstName}
                                        />
                                    </View>
                                    <View className='flex-1'>
                                        <Input
                                            label="Last Name"
                                            placeholder="Doe"
                                            value={attendee.lastName}
                                            onChangeText={(text) => onUpdateAttendee(index, 'lastName', text)}
                                            editable={!isLocked(index)}
                                            error={errors[index]?.lastName}
                                        />
                                    </View>
                                </View>

                                <Input
                                    label="Email Address"
                                    placeholder="john.doe@example.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={attendee.email}
                                    onChangeText={(text) => onUpdateAttendee(index, 'email', text)}
                                    editable={!isLocked(index)}
                                    error={errors[index]?.email}
                                />

                                {groupIndex < group.attendees.length - 1 && (
                                    <View className='h-px bg-gray-100 mt-2' />
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default AttendeesStep
