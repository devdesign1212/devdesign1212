// Base colors
export const baseColors = {
  transparent: 'transparent',
} as const;

// Define the theme color structure
export interface ThemeColors {
  background: string;
  textColor: string;
  inActive: string;
  card_BG: string;
  graph_Text: string;
  primaryColor: string;
  borderColor: string;
  activeColor: string;
  placeholderColor: string;
  transparent: string;
  whiteColor: string;
  blackColor: string;
  disableTextColor: string;
  fuelTextColor: string;
  fuelColor: string;
  eCommerceColor: string;
  mealColor: string;
  hotelsColor: string;
  blueColor: string;
  yellowColor: string;
  pinkColor: string;
  inActiveBg: string;
  authBg: string;
  buttonBg: string;
  lightGray: string;
  bodyColor: string;
  lightRed: string;
  border: string;
  lightPink: string;
  semiPink: string;
  greenColor: string;
}

// Light theme colors
export const lightTheme: ThemeColors = {
  ...baseColors,
  background: '#F5F7FA',
  textColor: '#000000',
  inActive: '#CACACA',
  card_BG: '#FFFFFF',
  graph_Text: '#718EBF',
  primaryColor: '#BF0204',
  borderColor: '#8E8E8E',
  activeColor: '#0C9D61',
  placeholderColor: '#8E8E8E',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  disableTextColor: '#8E8E8E',
  fuelTextColor: '#718EBF',
  fuelColor: '#4C78FF',
  eCommerceColor: '#C70507',
  mealColor: '#16DBCC',
  hotelsColor: '#FFBB38',
  blueColor: '#024EBF',
  yellowColor: '#DC8F00',
  pinkColor: '#BF00B8',
  inActiveBg: '#E1E1E1',
  authBg: '#ffe2e380',
  buttonBg: '#DB2729',
  lightGray: '#4C4C57',
  bodyColor: '#747483',
  lightRed: '#D4494B',
  border: '#BFBFBF',
  lightPink: '#FFBCBE',
  semiPink: '#FFF4F5',
  greenColor: '#26B11F',
};

export const darkTheme: ThemeColors = {
  ...baseColors,
  background: '#0D0D0D',
  textColor: '#FFFFFF',
  inActive: '#CACACA',
  card_BG: '#151515',
  graph_Text: '#839CC7',
  primaryColor: '#BF0204',
  borderColor: '#2B2B2B',
  activeColor: '#0EB56F',
  placeholderColor: '#8E8E8E',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  disableTextColor: '#CACACA',
  fuelTextColor: '#718EBF',
  fuelColor: '#4C78FF',
  eCommerceColor: '#C70507',
  mealColor: '#16DBCC',
  hotelsColor: '#FFBB38',
  blueColor: '#024EBF',
  yellowColor: '#DC8F00',
  pinkColor: '#BF00B8',
  inActiveBg: '#CACACA',
  authBg: '#ffe2e380',
  buttonBg: '#DB2729',
  lightGray: '#4C4C57',
  bodyColor: '#747483',
  lightRed: '#D4494B',
  border: '#BFBFBF',
  lightPink: '#FFBCBE',
  semiPink: '#FFF4F5',
  greenColor: '#26B11F',
};

export const colors = {
  light: lightTheme,
  dark: darkTheme,
} as const;
