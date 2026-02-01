import { darkTheme, lightTheme } from '@/themes/colors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ThemeColorInjector = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme); 

  useEffect(() => {
    const themeValues = currentTheme === 'light' ? lightTheme : darkTheme;
    const root = document.documentElement;

    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    Object.entries(themeValues).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value as string);
    });
  }, [currentTheme]);

  return null; 
};
