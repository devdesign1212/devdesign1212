// Base colors
export const baseColors = {
  transparent: 'transparent',
  brandPeacock: '#008585',
} as const;

// Define the theme color structure
export interface ThemeColors {
  background: string;
  textColor: string;
  inActive: string;
  activeColor: string;
  whiteColor: string;
  blackColor: string;
  primaryColor: string;
  secondaryColor: string;
  appBg: string;
  success: string;
  error: string;
  textSecondary: string;
  borderColor: string;
  card: string;
  maroon: string;
  grayColor: string;
  placeholderColor: string;
}

// Light theme colors
export const lightTheme: ThemeColors = {
  ...baseColors,
  background: '#F7F9F9',
  textColor: '#042121',
  inActive: '#94A3B8',
  activeColor: '#34eb86',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  primaryColor: '#008585',
  secondaryColor: '#222b40',
  appBg: '#EDF2F2',
  success: '#10B981',
  error: '#E11D48',
  textSecondary: '#526D6D',
  borderColor: '#D1DBDB',
  card: 'rgba(0, 133, 133, 0.04)',
  maroon: '#800000',
  grayColor: '#808080',
  placeholderColor: '#e3e4e6',
};

export const darkTheme: ThemeColors = {
  ...baseColors,
  background: '#333030',
  textColor: '#E6F2F2',
  inActive: '#2D3F3F',
  activeColor: '#34eb86',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  primaryColor: '#008585',
  secondaryColor: '#a9c9c9',
  appBg: '#081212',
  success: '#34D399',
  error: '#FB7185',
  textSecondary: '#586161',
  borderColor: '#1A2E2E',
  card: 'rgba(0, 163, 163, 0.03)',
  maroon: '#800000',
  grayColor: '#808080',
  placeholderColor: '#4c4c4d',
};

export const colors = {
  light: lightTheme,
  dark: darkTheme,
} as const;
