import { useMemo } from 'react';
import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

const fontWeightMap: Record<string, string> = {
  'font-thin': 'Lato-Thin',
  'font-light': 'Lato-Light',
  'font-normal': 'Lato-Regular',
  'font-medium': 'Lato-Bold',
  'font-semibold': 'Lato-Bold',
  'font-extrabold': 'Lato-Black',
  'font-black': 'Lato-Black',
};

const explicitFontFamilies = new Set([
  'font-lato',
  'font-lato-bold',
  'font-lato-black',
  'font-lato-light',
  'font-lato-thin',
  'font-lato-italic',
  'font-lato-bold-italic',
  'font-lato-black-italic',
  'font-lato-light-italic',
  'font-lato-thin-italic',
  'font-jost',
  'font-jost-medium',
  'font-jost-semibold',
  'font-jost-bold',
  'font-jost-extrabold',
  'font-jost-black',
]);

export function ThemedText({ style, lightColor, darkColor, className, ...rest }: ThemedTextProps) {
  const fontFamily = useMemo(() => {
    if (!className) return 'Lato-Regular';
    const classes = className.split(' ');

    // If an explicit font-family class is used (font-jost-*, font-lato-*),
    // let NativeWind handle it — don't override with style prop
    for (const cls of classes) {
      if (explicitFontFamilies.has(cls)) return undefined;
    }

    // Otherwise map font-weight classes to Lato variants
    for (const cls of classes) {
      if (fontWeightMap[cls]) return fontWeightMap[cls];
    }
    return 'Lato-Regular';
  }, [className]);

  return <Text className={`${className}`} style={[fontFamily ? { fontFamily } : undefined, style]} {...rest} />;
}
