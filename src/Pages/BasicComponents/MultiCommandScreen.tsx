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
  Zap,
  BarChart3,
  Brain,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextComponent from '@/components/Atoms/TextComponent';
import LaboratoryGallery from './Layout';
import i18n from '@/translations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { setTheme } from '@/Redux/Actions/themeActions';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { useTranslation } from 'react-i18next';

const MainCommandCenter = () => {
  const { t } = useTranslation();
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
    setSelectedLanguage(language);
  };

  return (
    <Box
      className={`relative min-h-screen  w-screen overflow-x-hidden overflow-y-scroll bg-background text-textColor transition-all ease-in-out `}
    >
      <header className="fixed top-0 z-[100] flex w-full items-center justify-between border-b border-borderColor px-6 py-4 backdrop-blur-md">
        <Group gap="xs" className="flex-row">
          <div className={`rounded-lg bg-primaryColor p-2`}>
            <Zap size={20} color={colors.whiteColor} fill={colors.whiteColor} />
          </div>
          <div>
            <TextComponent
              fontSize={22}
              fontWeight={900}
              color={colors.textColor}
              className="tracking-tighter"
            >
              DEV<span className="text-primaryColor">DESIGN</span>
            </TextComponent>
          </div>
        </Group>

        <Group gap="lg">
          <Menu shadow="md" width={120}>
            <Menu.Target>
              <Button
                variant="subtle"
                color={colors.textColor}
                leftSection={<Languages size={16} />}
              >
                {selectLanguage}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleLanguageSelect('en')}>
                English
              </Menu.Item>
              <Menu.Item onClick={() => handleLanguageSelect('hi')}>
                Hindi
              </Menu.Item>
              <Menu.Item onClick={() => handleLanguageSelect('mr')}>
                Marathi
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
            color={
              currentTheme === 'dark' ? colors.whiteColor : colors.primaryColor
            }
            size="lg"
            radius="md"
            onClick={toggleTheme}
          >
            {currentTheme === 'dark' ? (
              <Sun size={18} color={colors.blackColor} />
            ) : (
              <Moon size={18} />
            )}
          </ActionIcon>
        </Group>
      </header>

      <main className="px-10 pt-10">
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
                      color={colors.secondaryColor}
                      size="lg"
                      radius="sm"
                      p="md"
                    >
                      {t('DesignSystemVersion')}
                    </Badge>

                    <TextComponent
                      fontSize={60}
                      fontWeight={900}
                      color={colors.textColor}
                      className="leading-[1.1]"
                    >
                      {t('BridgingTheGapBetween')}{' '}
                      <span className={`text-primaryColor`}>
                        {t('CodeAndCreativity')}
                      </span>
                    </TextComponent>

                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.textSecondary}
                      className="max-w-md leading-relaxed"
                    >
                      {t('WelcomeToDevDesignLab')}
                    </TextComponent>

                    <ButtonComponent
                      title={t('Component') + ' ' + t('Lab')}
                      onClick={() => setShowLab(true)}
                      rightIcon={<ChevronRight size={18} />}
                      size={60}
                      radius={10}
                      variant="filled"
                      color={colors.whiteColor}
                      backgroundColor={colors.primaryColor}
                      borderColor={colors.primaryColor}
                    />
                  </Stack>

                  <Stack gap="md">
                    <TextComponent
                      fontSize={12}
                      fontWeight={800}
                      color={colors.primaryColor}
                      className="mb-4 uppercase tracking-[0.3em]"
                    >
                      {t('ProductEvolutionStrategy')}
                    </TextComponent>

                    <IncomingModule
                      icon={<BarChart3 size={20} />}
                      title={t('DataIntelligenceModule')}
                      desc={t('AdvancedDataVisualizationDesc')}
                      eta={`30 ${t('days')}`}
                      colors={colors}
                    />

                    <IncomingModule
                      icon={<Brain size={20} />}
                      title={t('CognitiveUIEngine')}
                      desc={t('ContextAwareComponents')}
                      eta={`60 ${t('days')}`}
                      colors={colors}
                    />

                    <div className="mt-4 rounded-2xl border border-secondaryColor border-opacity-10 bg-secondaryColor bg-opacity-5 p-6">
                      <TextComponent
                        fontSize={14}
                        fontWeight={500}
                        color={colors.textSecondary}
                      >
                        <strong>{t('DevDesignMemo')}</strong>{' '}
                        {t('OurRoadmapFocusesOnTransformingStaticUI')}
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
              className={`absolute inset-0 overflow-y-auto bg-background pt-9`}
            >
              <LaboratoryGallery setShowLab={setShowLab} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Box>
  );
};

const IncomingModule = ({ icon, title, desc, eta, colors }: any) => (
  <div
    className={`group flex items-start gap-5 rounded-2xl border border-dashed border-borderColor bg-card p-6 transition-all hover:border-solid`}
  >
    <div className="rounded-xl bg-[color-mix(in_srgb,var(--primaryColor)_20%,transparent)] p-3 text-primaryColor">
      {icon}
    </div>
    <Stack gap={2}>
      <Group justify="space-between">
        <TextComponent fontSize={16} fontWeight={800} color={colors.textColor}>
          {title}
        </TextComponent>
        <Badge variant="dot" color={colors.primaryColor} size="xs">
          {eta}
        </Badge>
      </Group>
      <TextComponent
        fontSize={12}
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
