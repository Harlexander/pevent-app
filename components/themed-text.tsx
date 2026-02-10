import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      className={`font-lato text-${color} ${styles[type]} ${className}`}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    // fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato-Regular',
  },
  defaultSemiBold: {
    // fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato-Bold',
  },
  title: {
    // fontSize: 32,
    fontFamily: 'Lato-Bold',
    lineHeight: 32,
  },
  subtitle: {
    // fontSize: 20,
    fontFamily: 'Lato-Bold',
  },
  link: {
    // lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
