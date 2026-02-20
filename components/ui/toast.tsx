import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  title?: string;
}

interface ToastContextValue {
  show: (config: ToastConfig) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3500;

const TOAST_CONFIG: Record<
  ToastType,
  {
    icon: keyof typeof Ionicons.glyphMap;
    // Light mode
    lightBg: string;
    lightBorder: string;
    lightIconBg: string;
    lightIconColor: string;
    lightTitle: string;
    lightMessage: string;
    lightClose: string;
    // Dark mode
    darkBg: string;
    darkIconBg: string;
    darkIconColor: string;
    darkTitle: string;
    darkMessage: string;
    darkClose: string;
    // Label
    label: string;
  }
> = {
  success: {
    icon: 'checkmark',
    lightBg: '#f0fdf4',
    lightBorder: '#bbf7d0',
    lightIconBg: '#22c55e',
    lightIconColor: '#fff',
    lightTitle: '#15803d',
    lightMessage: '#166534',
    lightClose: '#6b7280',
    darkBg: '#16a34a',
    darkIconBg: 'rgba(255,255,255,0.2)',
    darkIconColor: '#fff',
    darkTitle: '#fff',
    darkMessage: 'rgba(255,255,255,0.85)',
    darkClose: 'rgba(255,255,255,0.7)',
    label: 'Success',
  },
  info: {
    icon: 'information',
    lightBg: '#eff6ff',
    lightBorder: '#bfdbfe',
    lightIconBg: '#3b82f6',
    lightIconColor: '#fff',
    lightTitle: '#1d4ed8',
    lightMessage: '#1e40af',
    lightClose: '#6b7280',
    darkBg: '#0284c7',
    darkIconBg: 'rgba(255,255,255,0.2)',
    darkIconColor: '#fff',
    darkTitle: '#fff',
    darkMessage: 'rgba(255,255,255,0.85)',
    darkClose: 'rgba(255,255,255,0.7)',
    label: 'Info',
  },
  warning: {
    icon: 'alert',
    lightBg: '#fffbeb',
    lightBorder: '#fde68a',
    lightIconBg: '#f59e0b',
    lightIconColor: '#fff',
    lightTitle: '#b45309',
    lightMessage: '#92400e',
    lightClose: '#6b7280',
    darkBg: '#f59e0b',
    darkIconBg: 'rgba(255,255,255,0.2)',
    darkIconColor: '#fff',
    darkTitle: '#fff',
    darkMessage: 'rgba(255,255,255,0.85)',
    darkClose: 'rgba(255,255,255,0.7)',
    label: 'Warning',
  },
  error: {
    icon: 'close',
    lightBg: '#fef2f2',
    lightBorder: '#fecaca',
    lightIconBg: '#ef4444',
    lightIconColor: '#fff',
    lightTitle: '#b91c1c',
    lightMessage: '#991b1b',
    lightClose: '#6b7280',
    darkBg: '#dc2626',
    darkIconBg: 'rgba(255,255,255,0.2)',
    darkIconColor: '#fff',
    darkTitle: '#fff',
    darkMessage: 'rgba(255,255,255,0.85)',
    darkClose: 'rgba(255,255,255,0.7)',
    label: 'Error',
  },
};

interface ToastState extends ToastConfig {
  id: number;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const dismiss = useCallback(() => {
    setToast(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback((config: ToastConfig) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const id = ++idRef.current;
    setToast({ ...config, id });

    timerRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, config.duration ?? DEFAULT_DURATION);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => show({ message, type: 'success', duration }),
    [show],
  );
  const error = useCallback(
    (message: string, duration?: number) => show({ message, type: 'error', duration }),
    [show],
  );
  const info = useCallback(
    (message: string, duration?: number) => show({ message, type: 'info', duration }),
    [show],
  );
  const warning = useCallback(
    (message: string, duration?: number) => show({ message, type: 'warning', duration }),
    [show],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ show, success, error, info, warning }}>
      {children}
      {toast && <Toast toast={toast} onDismiss={dismiss} />}
    </ToastContext.Provider>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const type = toast.type ?? 'info';
  const config = TOAST_CONFIG[type];

  const title = toast.title ?? config.label;

  return (
    <Animated.View
      entering={SlideInUp.duration(350).easing(Easing.out(Easing.cubic))}
      exiting={SlideOutUp.duration(250).easing(Easing.in(Easing.cubic))}
      style={[styles.wrapper, { top: insets.top + 10 }]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? config.darkBg : config.lightBg,
            borderColor: isDark ? 'transparent' : config.lightBorder,
            borderWidth: isDark ? 0 : 1,
          },
        ]}
      >
        {/* Icon circle */}
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isDark ? config.darkIconBg : config.lightIconBg,
            },
          ]}
        >
          <Ionicons
            name={config.icon}
            size={14}
            color={isDark ? config.darkIconColor : config.lightIconColor}
          />
        </View>

        {/* Text content */}
        <View style={styles.textWrapper}>
          <Text
            style={[
              styles.title,
              { color: isDark ? config.darkTitle : config.lightTitle },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.message,
              { color: isDark ? config.darkMessage : config.lightMessage },
            ]}
            numberOfLines={2}
          >
            {toast.message}
          </Text>
        </View>

        {/* Dismiss */}
        <Pressable onPress={onDismiss} hitSlop={14} style={styles.closeBtn}>
          <Ionicons
            name="close"
            size={20}
            color={isDark ? config.darkClose : config.lightClose}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 1,
  },
  message: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  closeBtn: {
    padding: 4,
  },
});

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
