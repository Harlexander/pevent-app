import BackButton from '@/components/back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForgotPassword } from '@/hooks/query/useAuth';
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

const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        toast.success('A password reset link has been sent to your email.');
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
                <ThemedText className="text-3xl font-bold text-black dark:text-gray-100">Forgot Password</ThemedText>
                <ThemedText className="text-base opacity-60 text-black dark:text-gray-100">
                  Enter your email address and we'll send you a reset link.
                </ThemedText>
              </View>

              <View className="gap-5">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      value={value}
                      onChangeText={onChange}
                      error={errors.email?.message}
                    />
                  )}
                />

                <Button
                  className="mt-2"
                  onPress={handleSubmit(onSubmit)}
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? <ActivityIndicator color="white" /> : 'Send Reset Link'}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ForgotPassword;
