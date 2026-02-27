/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#d7d6d6ff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f5f5f5ff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE', 
    background: '#0f0f0fff',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: '#3B82F6',
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

export const HeadingFonts = {
  regular: 'Jost-Regular',
  medium: 'Jost-Medium',
  semiBold: 'Jost-SemiBold',
  bold: 'Jost-Bold',
  extraBold: 'Jost-ExtraBold',
  black: 'Jost-Black',
};
