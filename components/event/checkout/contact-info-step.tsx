import Input from '@/components/ui/input'
import { ThemedText } from '@/components/themed-text'
import { useUserStore } from '@/store/user-store'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native'

export interface ContactData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
}

export interface ContactErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
}

interface ContactInfoStepProps {
    data: ContactData;
    errors?: ContactErrors;
    onChange: (field: keyof ContactData, value: string) => void;
    onSetContact?: (data: ContactData) => void;
    sendToDifferentEmails?: boolean;
    onToggleSendToDifferent?: (value: boolean) => void;
    totalTickets?: number;
    useDefaultInfo?: boolean;
    onToggleUseDefault?: (value: boolean) => void;
}

const ContactInfoStep = ({
    data,
    errors = {},
    onChange,
    onSetContact,
    sendToDifferentEmails = false,
    onToggleSendToDifferent,
    totalTickets = 1,
    useDefaultInfo = false,
    onToggleUseDefault,
}: ContactInfoStepProps) => {
    const user = useUserStore((state) => state.user)
    const hasUserData = user && (user.firstName || user.email)

    const handleToggleDefault = (value: boolean) => {
        if (onToggleUseDefault) {
            onToggleUseDefault(value)
            if (value && user && onSetContact) {
                onSetContact({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    mobile: user.mobile || '',
                })
            }
        }
    }

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className='p-5 gap-4'>
                {hasUserData && onToggleUseDefault && (
                    <TouchableOpacity
                        onPress={() => handleToggleDefault(!useDefaultInfo)}
                        className={`flex-row items-center justify-between p-4 rounded-xl border ${useDefaultInfo ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-transparent'}`}
                        activeOpacity={0.7}
                    >
                        <View className='flex-row items-center gap-3 flex-1'>
                            <View className={`w-10 h-10 rounded-full items-center justify-center ${useDefaultInfo ? 'bg-primary/10' : 'bg-gray-200'}`}>
                                <Ionicons name="person" size={20} color={useDefaultInfo ? '#004cffff' : '#6b7280'} />
                            </View>
                            <View className='flex-1'>
                                <ThemedText className={`font-medium ${useDefaultInfo ? 'text-primary' : ''}`}>
                                    Use my account info
                                </ThemedText>
                                <ThemedText className='text-gray-500 text-xs'>
                                    {user?.email}
                                </ThemedText>
                            </View>
                        </View>
                        <View className={`w-6 h-6 rounded-md border-2 items-center justify-center ${useDefaultInfo ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                            {useDefaultInfo && <Ionicons name="checkmark" size={16} color="white" />}
                        </View>
                    </TouchableOpacity>
                )}

                <View className='flex-row gap-4'>
                    <View className='flex-1'>
                        <Input
                            label="First Name"
                            placeholder="John"
                            value={data.firstName}
                            onChangeText={(text) => onChange('firstName', text)}
                            editable={!useDefaultInfo}
                            error={errors.firstName}
                        />
                    </View>
                    <View className='flex-1'>
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            value={data.lastName}
                            onChangeText={(text) => onChange('lastName', text)}
                            editable={!useDefaultInfo}
                            error={errors.lastName}
                        />
                    </View>
                </View>

                <Input
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={data.email}
                    onChangeText={(text) => onChange('email', text)}
                    editable={!useDefaultInfo}
                    error={errors.email}
                />

                <Input
                    label="Mobile Number"
                    placeholder="+234 800 000 0000"
                    keyboardType="phone-pad"
                    value={data.mobile}
                    onChangeText={(text) => onChange('mobile', text)}
                    editable={!useDefaultInfo}
                    error={errors.mobile}
                />

                {totalTickets > 1 && onToggleSendToDifferent && (
                    <TouchableOpacity
                        onPress={() => onToggleSendToDifferent(!sendToDifferentEmails)}
                        className='flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mt-2'
                        activeOpacity={0.7}
                    >
                        <View className='flex-row items-center gap-3 flex-1'>
                            <View className='w-10 h-10 rounded-full bg-blue-100 items-center justify-center'>
                                <Ionicons name="people" size={20} color="#3b82f6" />
                            </View>
                            <View className='flex-1'>
                                <ThemedText className='font-medium'>Send to different attendees</ThemedText>
                                <ThemedText className='text-gray-500 text-xs'>
                                    Each ticket holder will receive their own ticket
                                </ThemedText>
                            </View>
                        </View>
                        <Switch
                            value={sendToDifferentEmails}
                            onValueChange={onToggleSendToDifferent}
                            trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                            thumbColor={sendToDifferentEmails ? '#3b82f6' : '#f4f4f5'}
                        />
                    </TouchableOpacity>
                )}

                {!sendToDifferentEmails && totalTickets > 1 && (
                    <View className='flex-row items-center gap-2 bg-amber-50 p-3 rounded-xl'>
                        <Ionicons name="information-circle" size={18} color="#d97706" />
                        <ThemedText className='text-amber-700 text-sm flex-1'>
                            All {totalTickets} tickets will be sent to {data.email || 'your email'}
                        </ThemedText>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ContactInfoStep
