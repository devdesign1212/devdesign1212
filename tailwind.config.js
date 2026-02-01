/** @type {import('tailwindcss').Config} */

import { lightTheme, darkTheme } from './src/themes/colors';

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
      colors: Object.fromEntries(
        Object.keys(lightTheme).map(key => [key, `var(--${key})`]),
      ),
    },
  },
  important: true,
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': Object.fromEntries(
          Object.entries(lightTheme).map(([key, value]) => [`--${key}`, value]),
        ),
        'html.dark, .dark': Object.fromEntries(
          Object.entries(darkTheme).map(([key, value]) => [`--${key}`, value]),
        ),
      });
    },
  ],
};
