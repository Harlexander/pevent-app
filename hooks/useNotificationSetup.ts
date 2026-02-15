import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { registerForPushNotificationsAsync } from '@/utils/notifications';
import { registerPushToken } from '@/actions/user';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotificationSetup() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasRegistered = useRef(false);

  useEffect(() => {
    if (hasRegistered.current) return;
    hasRegistered.current = true;

    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        try {
          await registerPushToken(token, Platform.OS);
        } catch (error) {
          console.warn('Failed to register push token with backend:', error);
        }
      }
    });
  }, []);

  useEffect(() => {
    const receivedSub = Notifications.addNotificationReceivedListener(() => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    });

    const responseSub = Notifications.addNotificationResponseReceivedListener(() => {
      router.push('/notifications');
    });

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, [queryClient, router]);
}
