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
  'font-bold': 'Lato-Bold',
  'font-extrabold': 'Lato-Black',
  'font-black': 'Lato-Black',
};

export function ThemedText({ style, lightColor, darkColor, className, ...rest }: ThemedTextProps) {
  const fontFamily = useMemo(() => {
    if (!className) return 'Lato-Regular';
    const classes = className.split(' ');
    for (const cls of classes) {
      if (fontWeightMap[cls]) return fontWeightMap[cls];
    }
    return 'Lato-Regular';
  }, [className]);

  return <Text className={`${className}`} style={[{ fontFamily }, style]} {...rest} />;
}
