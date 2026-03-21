import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

/**
 * Requests notification permission and returns a valid FCM token.
 * Works for both Android and iOS.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  // Request permission on iOS
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn('Push notification permission not granted');
      return null;
    }
  }

  try {
    // Get FCM token
    const fcmToken = await messaging().getToken();
    console.log('FCM device token:', fcmToken);

    // Listen for token refresh
    messaging().onTokenRefresh(token => {
      console.log('FCM token refreshed:', token);
      // send new token to your backend
    });

    // Optionally, you can set up a default notification channel for Android
    if (Platform.OS === 'android') {
      await setupAndroidNotificationChannel();
    }

    return fcmToken;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
}

// Minimal Android notification channel setup without Notifee
async function setupAndroidNotificationChannel() {
  // messaging().android.createChannel is not available by default,
  // but FCM messages will use "default" channel automatically.
  // If you want custom channels, you would need Notifee or react-native-push-notification.
  console.log('Android will use default notification channel');
}