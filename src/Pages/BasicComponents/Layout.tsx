import { useState, useMemo } from 'react';
import { Box, ActionIcon, Group, Stack, SimpleGrid } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MousePointer2,
  List,
  Calendar,
  FileCode,
  Type,
  AlignLeft,
  Menu as MenuIcon,
  LayoutIcon,
  Activity,
  Layers,
  MonitorCheck,
  BellRing,
  Split,
  BrainCircuit,
  ScanHeart,
  ScanQrCode,
} from 'lucide-react';

import TextComponent from '@/components/Atoms/TextComponent';
import ButtonDemo from './Demos/ButtonDemo';
import DropdownDemo from './Demos/DropdownDemo';
import FileInputDemo from './Demos/FileInputDemo';
import TextInputDemo from './Demos/InputDemo';
import ModalDemo from './Demos/ModalDemo';
import TextareaDemo from './Demos/TextareaDemo';
import DateDemo from './Demos/DateComponentDemo';
import MenuDemo from './Demos/MenuDemo';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import LiveMetricCardDemo from '../DataIntelligenceDemo/LiveMetricCardDemo';
import { useTranslation } from 'react-i18next';
import IntelligenceTableDemo from '../DataIntelligenceDemo/IntelligenceTableDemo';
import FeedbackDemo from '../DataIntelligenceDemo/FeedbackDemo';
import SwitchDemo from '../DataIntelligenceDemo/SwitchDemo';
import NeuralMap from '../DataIntelligenceDemo/NeuralMap';
import BioScanner from '../DataIntelligenceDemo/Scanner/BioScanner';
import QRScanner from '../DataIntelligenceDemo/Scanner/QRScanner';

const LaboratoryGallery = ({
  setShowLab,
}: {
  setShowLab: (show: boolean) => void;
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [activePortal, setActivePortal] = useState<string | null>(null);

  const components = useMemo(
    () => [
      {
        id: 'Btn',
        label: t('Layout.InteractionTokens'),
        sub: t('Layout.ButtonsTriggers'),
        icon: <MousePointer2 />,
        view: <ButtonDemo />,
        span: 1,
      },
      {
        id: 'TextInput',
        label: t('Layout.DataEntry'),
        sub: t('Layout.InputsValidation'),
        icon: <Type />,
        view: <TextInputDemo />,
        span: 2,
      },
      {
        id: 'Drop',
        label: t('Layout.SelectionLogic'),
        sub: t('Layout.DropdownsLists'),
        icon: <List />,
        view: <DropdownDemo />,
        span: 1,
      },
      {
        id: 'Date',
        label: t('Layout.TemporalUnits'),
        sub: t('Layout.DateTimePickers'),
        icon: <Calendar />,
        view: <DateDemo />,
        span: 1,
      },
      {
        id: 'File',
        label: t('Layout.AssetStream'),
        sub: t('Layout.FileUploaders'),
        icon: <FileCode />,
        view: <FileInputDemo />,
        span: 1,
      },
      {
        id: 'Modal',
        label: t('Layout.OverlayPrototypes'),
        sub: t('Layout.ModalsDrawers'),
        icon: <LayoutIcon />,
        view: <ModalDemo />,
        span: 2,
      },
      {
        id: 'Textarea',
        label: t('Layout.ContentBlocks'),
        sub: t('Layout.RichTextAreas'),
        icon: <AlignLeft />,
        view: <TextareaDemo />,
        span: 2,
      },
      {
        id: 'Menu',
        label: t('Layout.NavigationNodes'),
        sub: t('Layout.ContextMenus'),
        icon: <MenuIcon />,
        view: <MenuDemo />,
        span: 1,
      },
      {
        id: 'Intel',
        label: t('Layout.DataIntelligence'),
        sub: t('Layout.RealTimeAnalytics'),
        icon: <Activity />,
        view: <LiveMetricCardDemo />,
        span: 1,
      },
      {
        id: 'IntelTable',
        label: t('Layout.DataIntelligence'),
        sub: t('Layout.RealTimeAnalytics'),
        icon: <Activity />,
        view: <IntelligenceTableDemo />,
        span: 1,
      },
      {
        id: 'Feedback',
        label: t('feedback.FeedbackNodes'),
        sub: t('feedback.ToastsSystemAlerts'),
        icon: <BellRing />,
        view: <FeedbackDemo />,
        span: 1,
      },
      {
        id: 'Switch',
        label: t('Switch.NavigationNodes'),
        sub: t('Switch.LogicSwitchers'),
        icon: <Split />,
        view: <SwitchDemo />,
        span: 1,
      },
      {
        id: 'Neural',
        label: t('Layout.DataIntelligence'),
        sub: t('NuralMap.NodeMapping'),
        icon: <BrainCircuit />,
        view: <NeuralMap />,
        span: 1,
      },
      {
        id: 'BioScanner',
        label: t('Layout.DataIntelligence'),
        sub: t('NuralMap.NodeMapping'),
        icon: <ScanHeart />,
        view: <BioScanner />,
        span: 1,
      },
      {
        id: 'QRScanner',
        label: t('Layout.DataIntelligence'),
        sub: t('NuralMap.NodeMapping'),
        icon: <ScanQrCode />,
        view: <QRScanner />,
        span: 1,
      },
    ],
    [t],
  );

  return (
    <Box className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden bg-background p-6 md:p-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${colors.primaryColor} 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <AnimatePresence mode="wait">
        {!activePortal ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 mx-auto max-w-7xl"
          >
            <Group justify="space-between" mb={50}>
              <Stack gap={0}>
                <ActionIcon
                  variant="light"
                  size="xl"
                  radius="md"
                  onClick={() => setShowLab(false)}
                >
                  <ArrowLeft />
                </ActionIcon>

                <TextComponent
                  fontSize={48}
                  fontWeight={900}
                  color={colors.secondaryColor}
                  className="tracking-tighter"
                >
                  {t('Component')}
                  <span className="text-primaryColor">{t('Lab')}</span>
                </TextComponent>
              </Stack>

              <div className="hidden md:block">
                <Group gap="xl">
                  <StatBox
                    icon={<Layers size={16} />}
                    label="Library"
                    value="Atomic"
                  />
                  <StatBox
                    icon={<Activity size={16} />}
                    label="Status"
                    value="Stable"
                  />
                </Group>
              </div>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
              {components.map(comp => (
                <motion.div
                  key={comp.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActivePortal(comp.id)}
                  className={`group cursor-pointer overflow-y-auto overflow-x-hidden rounded-3xl border border-borderColor  bg-card p-6 transition-all hover:border-primaryColor hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${comp.span === 2 ? 'lg:col-span-2' : ''}`}
                >
                  <Stack justify="space-between" h="100%">
                    <div className="flex items-start justify-between">
                      <div className="rounded-2xl border border-borderColor bg-background p-3 text-primaryColor transition-colors group-hover:bg-primaryColor group-hover:text-white">
                        {comp.icon}
                      </div>
                      <MonitorCheck
                        size={14}
                        className="opacity-20 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <div>
                      <TextComponent
                        fontSize={18}
                        fontWeight={800}
                        mb={4}
                        color={colors.textColor}
                      >
                        {comp.label}
                      </TextComponent>
                      <TextComponent
                        fontSize={12}
                        fontWeight={400}
                        color={colors.textSecondary}
                      >
                        {comp.sub}
                      </TextComponent>
                    </div>
                  </Stack>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        ) : (
          <motion.div
            key="active-demo"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative z-50 mx-auto max-w-7xl pb-20"
          >
            <header className="mb-10 flex items-center justify-between">
              <ActionIcon
                variant="light"
                size="xl"
                radius="md"
                onClick={() => setActivePortal(null)}
              >
                <ArrowLeft />
              </ActionIcon>
              <Stack gap={0} align="flex-end">
                <TextComponent
                  fontSize={12}
                  fontWeight={800}
                  color={colors.primaryColor}
                  className="uppercase tracking-widest"
                >
                  {t('Documentation')} / {activePortal}
                </TextComponent>
                <TextComponent
                  fontSize={32}
                  fontWeight={900}
                  color={colors.textColor}
                >
                  {components.find(s => s.id === activePortal)?.label}
                </TextComponent>
              </Stack>
            </header>

            <main className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="relative flex min-h-[500px] items-center justify-center rounded-[40px] border  border-borderColor bg-card p-12 lg:col-span-8">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #ccc 0, #ccc 1px, transparent 0, transparent 50%)',
                    backgroundSize: '10px 10px',
                  }}
                />
                <div className="relative z-10 w-full">
                  {components.find(s => s.id === activePortal)?.view}
                </div>
              </div>

              <div className="lg:col-span-4">
                <Stack gap="lg">
                  <div className="rounded-[32px] border border-borderColor bg-card p-8">
                    <TextComponent
                      fontSize={14}
                      fontWeight={800}
                      mb="xl"
                      className=" uppercase tracking-widest"
                      color={colors.textColor}
                    >
                      {t('EngineeringSpecs')}
                    </TextComponent>
                    <Stack gap="md">
                      <SpecRow label="Framework" value="React 18" />
                      <SpecRow label="Type Safety" value="TypeScript 5.0" />
                      <SpecRow label="Animation" value="Framer Motion" />
                      <SpecRow label="Architecture" value="Atomic Design" />
                    </Stack>
                  </div>
                </Stack>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const StatBox = ({ icon, label, value }: any) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <Group gap="sm">
      <div className="rounded-lg border border-borderColor bg-card p-2">
        {icon}
      </div>
      <Stack gap={0}>
        <TextComponent fontSize={10} fontWeight={700} color="gray">
          {label}
        </TextComponent>
        <TextComponent fontSize={12} fontWeight={800} color={colors.textColor}>
          {value}
        </TextComponent>
      </Stack>
    </Group>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <div className="flex justify-between border-b border-borderColor pb-3 last:border-0">
      <TextComponent fontSize={11} fontWeight={700} color="gray">
        {label}
      </TextComponent>
      <TextComponent fontSize={12} fontWeight={600} color={colors.textColor}>
        {value}
      </TextComponent>
    </div>
  );
};

export default LaboratoryGallery;
