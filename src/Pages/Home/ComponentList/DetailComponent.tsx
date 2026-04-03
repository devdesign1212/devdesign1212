import { ActionIcon, Stack } from '@mantine/core';
import SpecRow from './SpecRow';
import TextComponent from '@/components/Atoms/TextComponent';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { ComponentItem } from '@/Common/interface';

const DetailComponent = ({
  ArrowClick,
  components,
  activePortal,
}: {
  ArrowClick: () => void;
  components: ComponentItem[];
  activePortal: string;
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <motion.div
      key="active-demo"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="relative z-50 mx-auto max-w-7xl pb-20"
    >
      <header className="mb-10 flex items-center justify-between">
        <ActionIcon variant="light" size="xl" radius="md" onClick={ArrowClick}>
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
  );
};

export default DetailComponent;
