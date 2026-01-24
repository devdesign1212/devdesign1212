/** @type {import('tailwindcss').Config} */
const themeColor = require('./src/themes/colors');

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '2560px': '2560px',
        '1440px': '1440px',
        '425px': '425px',
        '375px': '375px',
        '320px': '320px',
      },
    },
    fontFamily: {
      sans: ['Manrope', 'serif'],
    },
    extend: {
      colors: {
        light: {
          ...themeColor.lightTheme,
        },
        dark: {
          ...themeColor.darkTheme,
        },
      },
    },
  },
  plugins: [],
};
