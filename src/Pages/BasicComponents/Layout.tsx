import { useState, useMemo, useEffect } from 'react';
import { Box, ActionIcon, Tooltip, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MousePointer2,
  List,
  Calendar,
  FileCode,
  Type,
  Layout,
  AlignLeft,
  Menu as MenuIcon,
  Rocket,
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
import { useTranslation } from 'react-i18next';

const LaboratoryGallery = ({
  setShowLab,
}: {
  setShowLab: (show: boolean) => void;
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [winSize, setWinSize] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const handleResize = () =>
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const components = useMemo(
    () => [
      {
        id: 'Btn',
        label: 'Buttons',
        icon: <MousePointer2 size={20} />,
        view: <ButtonDemo />,
      },
      {
        id: 'Drop',
        label: 'Selects',
        icon: <List size={20} />,
        view: <DropdownDemo />,
      },
      {
        id: 'Date',
        label: 'Pickers',
        icon: <Calendar size={20} />,
        view: <DateDemo />,
      },
      {
        id: 'File',
        label: 'Assets',
        icon: <FileCode size={20} />,
        view: <FileInputDemo />,
      },
      {
        id: 'TextInput',
        label: 'Inputs',
        icon: <Type size={20} />,
        view: <TextInputDemo />,
      },
      {
        id: 'Modal',
        label: 'Overlays',
        icon: <Layout size={20} />,
        view: <ModalDemo />,
      },
      {
        id: 'Textarea',
        label: 'Rich Text',
        icon: <AlignLeft size={20} />,
        view: <TextareaDemo />,
      },
      {
        id: 'Menu',
        label: 'Navigation',
        icon: <MenuIcon size={20} />,
        view: <MenuDemo />,
      },
    ],
    [],
  );

  const getPosition = (index: number, total: number) => {
    const baseRadius = Math.min(winSize.w, winSize.h) * 0.32;
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * baseRadius;
    const y = Math.sin(angle) * baseRadius;
    return { x, y };
  };

  return (
    <Box className="bg-background selection:bg-secondaryColor relative h-screen w-screen overflow-hidden ">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="bg-secondaryColor absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="bg-secondaryColor absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full blur-[100px]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--borderColor) 1px, transparent 1px), linear-gradient(90deg, var(--borderColor) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <AnimatePresence mode="wait">
        {!activePortal ? (
          <motion.div
            key="orbit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="relative z-10 flex h-full w-full items-center justify-center"
          >
            <div className="absolute left-10 top-10 z-[100]">
              <Button
                leftSection={<ArrowLeft size={16} />}
                variant="subtle"
                color="gray"
                onClick={() => setShowLab(false)}
              >
                {t('ReturnToCommand')}
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute h-[64%] w-[64%] rounded-full border border-[color-mix(in_srgb,var(--whiteColor)_5%,transparent)] " />
              <div className="pointer-events-none absolute h-[40%] w-[40%] rounded-full border border-[color-mix(in_srgb,var(--whiteColor)_2%,transparent)]" />

              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <div className="mt-6 flex items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--whiteColor)_10%,transparent)] bg-[color-mix(in_srgb,var(--whiteColor)_5%,transparent)] px-4 py-1.5">
                  <div className="bg-activeColor h-1.5 w-1.5 animate-pulse rounded-full" />
                  <span className="text-secondaryColor text-[10px] font-bold uppercase tracking-widest">
                    {components.length} {t('ActiveNodes')}
                  </span>
                </div>
              </div>

              {components.map((sat, index) => {
                const { x, y } = getPosition(index, components.length);
                return (
                  <motion.div
                    key={sat.id}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{
                      delay: index * 0.04,
                      type: 'spring',
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.15, zIndex: 50 }}
                  >
                    <Tooltip
                      label={sat.label}
                      position="top"
                      withArrow
                      offset={14}
                      color={colors.primaryColor}
                    >
                      <button
                        onClick={() => setActivePortal(sat.id)}
                        className="text-textSecondary hover:text-primaryColor bg-secondaryColor group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--whiteColor)_10%,transparent)] backdrop-blur-md transition-all hover:border-[color-mix(in_srgb,var(--primaryColor)_50%,transparent)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                      >
                        {sat.icon}
                        <div className="from-textSecondary absolute -bottom-10 -z-10 h-10 w-[1px] bg-gradient-to-b to-transparent" />
                      </button>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-40 transition-opacity hover:opacity-100">
              <div className="border-secondaryColor rounded-xl border border-dashed p-3">
                <Rocket size={18} className={colors.textSecondary} />
              </div>
              <div>
                <TextComponent
                  fontSize={10}
                  fontWeight={800}
                  color={colors.secondaryColor}
                  className="uppercase tracking-widest"
                >
                  {t('NextEvolution')}
                </TextComponent>
                <TextComponent
                  fontSize={12}
                  fontWeight={600}
                  color={colors.secondaryColor}
                >
                  {t('AdvancedDataVisualization')}
                </TextComponent>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="portal"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background absolute inset-0 z-50 overflow-y-auto p-3 md:p-12"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col">
              <header className="mb-3 flex items-center justify-between">
                <ActionIcon
                  variant="subtle"
                  color={colors.textSecondary}
                  size="xl"
                  onClick={() => setActivePortal(null)}
                >
                  <ArrowLeft size={22} />
                </ActionIcon>
                <div className="flex flex-col items-end">
                  <Badge mb={4}>{t('BaseLayerComponent')}</Badge>
                  <TextComponent
                    fontSize={32}
                    fontWeight={900}
                    color={colors.secondaryColor}
                  >
                    {components.find(s => s.id === activePortal)?.label}
                  </TextComponent>
                </div>
              </header>

              <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="border-borderColor bg-card relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[40px] border p-8 shadow-2xl lg:col-span-8">
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        'radial-gradient(var(--whiteColor) 1.5px, transparent 0)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10 w-full max-w-lg">
                    {components.find(s => s.id === activePortal)?.view}
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-4">
                  <div className="bg-card border-borderColor rounded-[32px] border p-8">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="bg-secondaryColor h-4 w-1 rounded-full" />
                      <TextComponent
                        fontSize={12}
                        fontWeight={800}
                        color={colors.secondaryColor}
                        className="uppercase tracking-widest"
                      >
                        {t('TechStack')}
                      </TextComponent>
                    </div>
                    <div className="space-y-4">
                      <SpecRow label="Runtime" value="React 18 Engine" />
                      <SpecRow label="Physics" value="Framer Motion" />
                      <SpecRow label="Styling" value="Tailwind + Mantine" />
                      <SpecRow label="Accessibility" value="Aria-Compliant" />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-white/[0.03] pb-2 last:border-0">
    <TextComponent fontSize={11} fontWeight={700} color="#475569">
      {label}
    </TextComponent>
    <TextComponent fontSize={12} fontWeight={600} color="#cbd5e1">
      {value}
    </TextComponent>
  </div>
);

const Badge = ({ children, mb }: any) => (
  <div
    style={{ marginBottom: mb }}
    className="border-secondaryColor bg-card text-textSecondary flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em]"
  >
    <div className="bg-textSecondary h-1 w-1 rounded-full" />
    {children}
  </div>
);

export default LaboratoryGallery;
