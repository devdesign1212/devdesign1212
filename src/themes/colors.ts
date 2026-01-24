// Base colors
export const baseColors = {
  transparent: 'transparent',
} as const;

// Define the theme color structure
export interface ThemeColors {
  background: string;
  textColor: string;
  inActive: string;
  activeColor: string;
  whiteColor: string;
  blackColor: string;
}

// Light theme colors
export const lightTheme: ThemeColors = {
  ...baseColors,
  background: '#F5F7FA',
  textColor: '#000000',
  inActive: '#CACACA',
  activeColor: '#0C9D61',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
};

export const darkTheme: ThemeColors = {
  ...baseColors,
  background: '#0D0D0D',
  textColor: '#FFFFFF',
  inActive: '#CACACA',
  activeColor: '#0EB56F',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
};

export const colors = {
  light: lightTheme,
  dark: darkTheme,
} as const;
