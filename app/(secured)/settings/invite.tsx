import BackButton from '@/components/back-button';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { applyReferralCode, getReferral } from '@/actions/user';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Clipboard from 'expo-clipboard';
import { useToast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/error';
import React, { useState } from 'react';
import Skeleton from '@/components/ui/skeleton';
import { KeyboardAvoidingView, Platform, Share, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InviteFriends = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [referralInput, setReferralInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['referral'],
    queryFn: getReferral,
  });

  const referral = data?.data;

  const applyMutation = useMutation({
    mutationFn: (code: string) => applyReferralCode(code),
    onSuccess: (res) => {
      toast.success(res.message || 'Referral code applied successfully');
      setReferralInput('');
      queryClient.invalidateQueries({ queryKey: ['referral'] });
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error, 'Invalid referral code. Please try again.'));
    },
  });

  const handleCopy = async () => {
    if (!referral?.referralCode) return;
    await Clipboard.setStringAsync(referral.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!referral?.referralCode) return;
    await Share.share({
      message: `Join me on Pevent! Use my referral code: ${referral.referralCode}`,
    });
  };

  const handleApply = () => {
    const code = referralInput.trim();
    if (!code) {
      toast.error('Please enter a referral code');
      return;
    }
    applyMutation.mutate(code);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg">
        {/* Header */}
        <View className="flex-row items-center px-5 py-3">
          <BackButton />
          <ThemedText className="text-lg font-bold ml-3 text-black dark:text-white">Invite Friends</ThemedText>
        </View>

        <View className="flex-1 px-5 pt-4" style={{ gap: 28 }}>
          {/* Icon + text skeleton */}
          <View className="items-center py-6" style={{ gap: 12 }}>
            <Skeleton width={80} height={80} borderRadius={40} />
            <Skeleton width={180} height={28} borderRadius={6} />
            <Skeleton width={260} height={14} borderRadius={4} />
            <Skeleton width={220} height={14} borderRadius={4} />
          </View>

          {/* Referral code section skeleton */}
          <View style={{ gap: 12 }}>
            <Skeleton width={130} height={12} borderRadius={4} />
            <Skeleton height={52} borderRadius={12} className="w-full" />

            {/* Stats row skeleton */}
            <View className="flex-row" style={{ gap: 12 }}>
              <View className="flex-1">
                <Skeleton height={72} borderRadius={12} className="w-full" />
              </View>
              <View className="flex-1">
                <Skeleton height={72} borderRadius={12} className="w-full" />
              </View>
            </View>

            {/* Share button skeleton */}
            <Skeleton height={44} borderRadius={12} className="w-full" />
          </View>

          {/* Apply code section skeleton */}
          <View style={{ gap: 12 }}>
            <Skeleton width={150} height={12} borderRadius={4} />
            <Skeleton height={52} borderRadius={12} className="w-full" />
            <Skeleton height={64} borderRadius={12} className="w-full" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-5 py-3">
          <BackButton />
          <ThemedText className="text-lg font-bold ml-3 text-black dark:text-white">Invite Friends</ThemedText>
        </View>

        <View className="flex-1 px-5 pt-4" style={{ gap: 28 }}>
          {/* Illustration area */}
          <View className="items-center py-6" style={{ gap: 12 }}>
            <View className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
              <Ionicons name="gift-outline" size={40} color="#004cff" />
            </View>
            <ThemedText className="text-2xl font-bold text-center text-slate-900 dark:text-gray-100">
              Share the love
            </ThemedText>
            <ThemedText className="text-sm text-gray-500 dark:text-gray-400 text-center leading-5 px-4">
              Invite your friends to Pevent and enjoy events together. Share your referral code below!
            </ThemedText>
          </View>

          {/* Your referral code */}
          <View style={{ gap: 12 }}>
            <ThemedText className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Your referral code
            </ThemedText>
            <View className="flex-row items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <View className="flex-1 px-4 py-4">
                <ThemedText className="text-lg font-bold tracking-wider text-slate-900 dark:text-gray-100">
                  {referral?.referralCode || '—'}
                </ThemedText>
              </View>
              <TouchableOpacity
                onPress={handleCopy}
                className="px-4 py-4 border-l border-gray-200 dark:border-gray-700"
                activeOpacity={0.7}
              >
                <Ionicons name={copied ? 'checkmark-done' : 'copy-outline'} size={22} color="#004cff" />
              </TouchableOpacity>
            </View>

            {/* Stats row */}
            <View className="flex-row" style={{ gap: 12 }}>
              <View className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 items-center" style={{ gap: 4 }}>
                <ThemedText className="text-2xl font-bold text-blue-600">
                  {referral?.referralCount ?? 0}
                </ThemedText>
                <ThemedText className="text-xs text-gray-500 dark:text-gray-400">Friends invited</ThemedText>
              </View>
              {referral?.referredBy && (
                <View className="flex-1 bg-green-50 dark:bg-green-900/30 rounded-xl p-4 items-center" style={{ gap: 4 }}>
                  <ThemedText className="text-sm font-bold text-green-600">
                    {referral.referredBy}
                  </ThemedText>
                  <ThemedText className="text-xs text-gray-500 dark:text-gray-400">Referred by</ThemedText>
                </View>
              )}
            </View>

            {/* Share button */}
            <TouchableOpacity
              onPress={handleShare}
              className="flex-row items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-xl py-3"
              style={{ gap: 8 }}
              activeOpacity={0.7}
            >
              <Ionicons name="share-social-outline" size={20} color="#004cff" />
              <ThemedText className="text-sm font-semibold text-blue-600">
                Share with friends
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Apply a referral code */}
          {!referral?.referredBy && (
            <View style={{ gap: 12 }}>
              <ThemedText className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Have a referral code?
              </ThemedText>
              <Input
                placeholder="Enter referral code"
                value={referralInput}
                onChangeText={setReferralInput}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Button onPress={handleApply} disabled={applyMutation.isPending || !referralInput.trim()}>
                {applyMutation.isPending ? 'Applying...' : 'Apply Code'}
              </Button>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InviteFriends;
