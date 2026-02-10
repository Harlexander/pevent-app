/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE', 
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: '#004cffff',
};

export const Fonts = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  black: 'Lato-Black',
  light: 'Lato-Light',
  thin: 'Lato-Thin',
  italic: 'Lato-Italic',
  boldItalic: 'Lato-BoldItalic',
  blackItalic: 'Lato-BlackItalic',
  lightItalic: 'Lato-LightItalic',
  thinItalic: 'Lato-ThinItalic',
};
