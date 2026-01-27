import { useEffect, useState } from 'react';
import {
  Box,
  Group,
  ActionIcon,
  Menu,
  Button,
  Stack,
  Container,
  Badge,
} from '@mantine/core';
import {
  Sun,
  Moon,
  Languages,
  ChevronRight,
  ArrowLeft,
  Zap,
  BarChart3,
  Brain,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextComponent from '@/components/Atoms/TextComponent';
import LaboratoryGallery from './Laborotory/Layout';
import i18n from '@/translations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { setTheme } from '@/Redux/Actions/themeActions';

const MainCommandCenter = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [selectLanguage, setSelectedLanguage] = useState('en');
  const [showLab, setShowLab] = useState(false);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(nextTheme));
  };

  useEffect(() => {
    if (selectLanguage) {
      setSelectedLanguage(selectLanguage);
      i18n.changeLanguage(selectLanguage);
    }
  }, [selectLanguage]);

  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Box
      style={{
        backgroundColor: colors.bg,
        color: colors.textColor,
        transition: 'all 0.4s ease',
      }}
      className="relative min-h-screen w-screen overflow-x-hidden"
    >
      <header className="fixed top-0 z-[100] flex w-full items-center justify-between border-b border-white/5 p-6 backdrop-blur-md">
        <Group gap="xs">
          <div
            className="rounded-lg p-2"
            style={{ backgroundColor: colors.primaryColor }}
          >
            <Zap size={20} color="white" fill="white" />
          </div>
          <TextComponent
            fontSize={22}
            fontWeight={900}
            color={colors.textColor}
            className="tracking-tighter"
          >
            DEV<span style={{ color: colors.primaryColor }}>DESIGN</span>
          </TextComponent>
        </Group>

        <Group gap="lg">
          <Menu shadow="md" width={120}>
            <Menu.Target>
              <Button
                variant="subtle"
                color="gray"
                leftSection={<Languages size={16} />}
              >
                {selectLanguage}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleLanguageSelect('en')}>
                English
              </Menu.Item>
              <Menu.Item onClick={() => handleLanguageSelect('fr')}>
                Français
              </Menu.Item>
              <Menu.Item onClick={() => handleLanguageSelect('de')}>
                Deutsch
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            variant="filled"
            color={currentTheme === 'dark' ? 'yellow' : 'blue'}
            size="lg"
            radius="md"
            onClick={toggleTheme}
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>
        </Group>
      </header>

      <main className="px-10 pt-32">
        <AnimatePresence mode="wait">
          {!showLab ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mx-auto max-w-6xl"
            >
              <Container size="xl" pt={60}>
                <div className="grid grid-cols-1 items-start gap-24 lg:grid-cols-2">
                  <Stack gap="xl">
                    <Badge
                      variant="outline"
                      color="blue"
                      size="lg"
                      radius="sm"
                      p="md"
                    >
                      Design System v1.0
                    </Badge>

                    <TextComponent
                      fontSize={68}
                      fontWeight={900}
                      color={colors.textColor}
                      className="leading-[1.1]"
                    >
                      Bridging the gap between{' '}
                      <span style={{ color: colors.primaryColor }}>
                        Code & Creativity.
                      </span>
                    </TextComponent>

                    <TextComponent
                      fontSize={18}
                      fontWeight={400}
                      color={colors.textSecondary}
                      className="max-w-md leading-relaxed"
                    >
                      Welcome to the Dev Design Engineering Lab. Access our core
                      atomic components and explore the foundations of our
                      future-proof interface protocols.
                    </TextComponent>

                    <Button
                      size="xl"
                      radius="md"
                      style={{ backgroundColor: colors.buttonBg }}
                      onClick={() => setShowLab(true)}
                      rightSection={<ChevronRight size={18} />}
                      className="h-14 w-fit px-12 transition-opacity hover:opacity-90"
                    >
                      Enter Component Lab
                    </Button>
                  </Stack>

                  <Stack gap="md">
                    <TextComponent
                      fontSize={12}
                      fontWeight={800}
                      color={colors.primaryColor}
                      className="mb-4 uppercase tracking-[0.3em]"
                    >
                      Product Evolution Strategy
                    </TextComponent>

                    <IncomingModule
                      icon={<BarChart3 size={20} />}
                      title="Data Intelligence Module"
                      desc="Advanced visualization and real-time analytics engine."
                      eta="30 Days"
                      colors={colors}
                    />

                    <IncomingModule
                      icon={<Brain size={20} />}
                      title="Cognitive UI Engine"
                      desc="Context-aware components powered by adaptive machine learning."
                      eta="60 Days"
                      colors={colors}
                    />

                    <div className="mt-4 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-6">
                      <TextComponent
                        fontSize={14}
                        fontWeight={500}
                        color={colors.textSecondary}
                      >
                        <strong>Dev Design Memo:</strong> Our roadmap focuses on
                        transforming static UI into intelligent, data-driven
                        experiences.
                      </TextComponent>
                    </div>
                  </Stack>
                </div>
              </Container>
            </motion.div>
          ) : (
            <motion.div
              key="laboratory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[150] bg-[#0A0A0B]"
            >
              <div className="absolute left-10 top-10 z-[100]">
                <Button
                  leftSection={<ArrowLeft size={16} />}
                  variant="subtle"
                  color="gray"
                  onClick={() => setShowLab(false)}
                >
                  Return to Command
                </Button>
              </div>
              <LaboratoryGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Box>
  );
};

const IncomingModule = ({ icon, title, desc, eta, colors }: any) => (
  <div
    className="group flex items-start gap-5 rounded-2xl border border-dashed p-6 transition-all hover:border-solid"
    style={{
      borderColor: colors.borderColor,
      backgroundColor: colors.whiteColor + '02',
    }}
  >
    <div
      className="rounded-xl p-3"
      style={{
        backgroundColor: colors.primaryColor + '20',
        color: colors.primaryColor,
      }}
    >
      {icon}
    </div>
    <Stack gap={2}>
      <Group justify="space-between">
        <TextComponent fontSize={18} fontWeight={800} color={colors.textColor}>
          {title}
        </TextComponent>
        <Badge variant="dot" color="blue" size="xs">
          {eta}
        </Badge>
      </Group>
      <TextComponent
        fontSize={13}
        fontWeight={400}
        color={colors.textSecondary}
        className="max-w-[280px]"
      >
        {desc}
      </TextComponent>
    </Stack>
  </div>
);

export default MainCommandCenter;
