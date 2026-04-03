import { motion } from 'framer-motion';
import { ActionIcon, Group, SimpleGrid, Stack } from '@mantine/core';
import { Activity, ArrowLeft, Layers, MonitorCheck } from 'lucide-react';
import TextComponent from '@/components/Atoms/TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useTranslation } from 'react-i18next';
import StatBox from './StatBox';
import { ComponentItem } from '@/Common/interface';

const Components = ({
  ArrowOnClick,
  components,
  dataOnClick,
}: {
  ArrowOnClick: () => void;
  components: ComponentItem[];
  dataOnClick: (comp: ComponentItem) => void;
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
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
            onClick={ArrowOnClick}
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
            onClick={() => dataOnClick(comp)}
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
  );
};

export default Components;
