import BackButton from '@/components/back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useResetPassword } from '@/hooks/query/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const { id, token } = useLocalSearchParams<{ id: string; token: string }>();
  const resetPasswordMutation = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    if (!id || !token) {
      Alert.alert('Error', 'Invalid reset link. Please request a new one.');
      return;
    }

    resetPasswordMutation.mutate(
      { password: data.password, id, token },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Your password has been reset. Please log in.', [
            { text: 'OK', onPress: () => router.replace('/(onboarding)/login') },
          ]);
        },
        onError: (error) => {
          Alert.alert('Error', (error as AxiosError<{ message: string }>).response?.data.message);
        },
      },
    );
  };

  return (
    <ThemedView className="flex-1 h-screen bg-white">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <BackButton />

            <View className="mt-8">
              <View className="gap-2 mb-8">
                <ThemedText className="text-3xl font-bold text-black">Reset Password</ThemedText>
                <ThemedText className="text-base opacity-60 text-black">Enter your new password below.</ThemedText>
              </View>

              <View className="gap-5">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="New Password"
                      placeholder="••••••••"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      error={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Confirm Password"
                      placeholder="••••••••"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />

                <Button
                  className="mt-2"
                  onPress={handleSubmit(onSubmit)}
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? <ActivityIndicator color="white" /> : 'Reset Password'}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ResetPassword;
