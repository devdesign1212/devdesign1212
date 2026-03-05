import { Group, Stack, Container, Badge } from '@mantine/core';
import { ChevronRight, BarChart3, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextComponent from '@/components/Atoms/TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 bg-background">
      <AnimatePresence mode="wait">
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
                  onClick={() => navigate('/component-lab')}
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
      </AnimatePresence>
    </div>
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

export default Dashboard;
