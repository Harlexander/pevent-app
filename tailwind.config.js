/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontSize: {
        xs: '0.8125rem',  // Increased from default 0.75rem (12px -> 13px)
      },
      colors: {
        primary: '#007bff',
        'dark-bg': '#212121',
        'dark-card': '#121212',
        black: '#000000',
      },
      fontFamily: {
        'lato': ['Lato-Regular'],
        'lato-bold': ['Lato-Bold'],
        'lato-black': ['Lato-Black'],
        'lato-light': ['Lato-Light'],
        'lato-thin': ['Lato-Thin'],
        'lato-italic': ['Lato-Italic'],
        'lato-bold-italic': ['Lato-BoldItalic'],
        'lato-black-italic': ['Lato-BlackItalic'],
        'lato-light-italic': ['Lato-LightItalic'],
        'lato-thin-italic': ['Lato-ThinItalic'],
        'jost': ['Jost-Regular'],
        'jost-medium': ['Jost-Medium'],
        'jost-semibold': ['Jost-SemiBold'],
        'jost-bold': ['Jost-Bold'],
        'jost-extrabold': ['Jost-ExtraBold'],
        'jost-black': ['Jost-Black'],
      },
    },
  },
  plugins: [],
};
