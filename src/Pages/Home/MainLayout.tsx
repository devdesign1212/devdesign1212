import { setTheme } from '@/Redux/Actions/themeActions';
import CommandFooter from '@/components/Organisms/Layout/Footer';
import CommandHeader from '@/components/Organisms/Layout/Header';
import i18n from '@/translations';
import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [selectLanguage, setSelectedLanguage] = useState('en');
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectLanguage) {
      setSelectedLanguage(selectLanguage);
      i18n.changeLanguage(selectLanguage);
    }
  }, [selectLanguage]);

  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <Box
      className={`relative min-h-screen w-screen overflow-x-hidden overflow-y-hidden bg-background text-textColor transition-all ease-in-out `}
    >
      <CommandHeader
        toggleTheme={() =>
          dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'))
        }
        selectLanguage={selectLanguage}
        handleLanguageSelect={(language: string) =>
          handleLanguageSelect(language)
        }
      />
      <main className="px-10 pt-8">
        <Outlet />
      </main>
      <CommandFooter />
    </Box>
  );
};

export default MainLayout;
