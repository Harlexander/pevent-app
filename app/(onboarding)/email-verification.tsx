import BackButton from '@/components/back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useEmailVerification } from '@/hooks/query/useAuth';
import { useSession } from '@/Provider/session-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/error';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const emailVerificationSchema = z.object({
  otp: z.string().min(1, { message: 'OTP is required' }),
});

type EmailVerificationForm = z.infer<typeof emailVerificationSchema>;

const EmailVerification = () => {
  const router = useRouter();
  const verificationMutation = useEmailVerification();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationForm>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: { otp: '' },
  });

  const onSubmit = (data: EmailVerificationForm) => {
    verificationMutation.mutate(parseInt(data.otp, 10), {
      onSuccess: () => {
        toast.success('Your email has been verified.');
        router.back();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <ThemedView className="flex-1 h-screen bg-white dark:bg-dark-bg">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <BackButton />

            <View className="mt-8">
              <View className="gap-2 mb-8">
                <ThemedText className="text-3xl font-jost-semibold text-black dark:text-gray-100">Verify Your Email</ThemedText>
                <ThemedText className="text-base opacity-60 text-black dark:text-gray-100">
                  Enter the verification code sent to your email address.
                </ThemedText>
              </View>

              <View className="gap-5">
                <Controller
                  control={control}
                  name="otp"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Verification Code"
                      placeholder="Enter code"
                      keyboardType="number-pad"
                      value={value}
                      onChangeText={onChange}
                      error={errors.otp?.message}
                    />
                  )}
                />

                <Button
                  className="mt-2"
                  onPress={handleSubmit(onSubmit)}
                  disabled={verificationMutation.isPending}
                >
                  {verificationMutation.isPending ? <ActivityIndicator color="white" /> : 'Verify'}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default EmailVerification;
