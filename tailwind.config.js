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
      },
    },
  },
  plugins: [],
};
