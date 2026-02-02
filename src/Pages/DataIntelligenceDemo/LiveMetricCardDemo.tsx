import TextComponent from '@/components/Atoms/TextComponent';
import { LiveMetricCard } from '@/components/Molecules/LiveMetricCard';
import { SimpleGrid, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const LiveMetricCardDemo = () => {
  const { t } = useTranslation();

  const mockData = [
    { value: 400 },
    { value: 300 },
    { value: 600 },
    { value: 800 },
    { value: 500 },
    { value: 900 },
  ];
  return (
    <Stack gap="xl" w="100%">
      <TextComponent fontSize={14} fontWeight={600} color="dimmed">
        {t('LiveMetricCard.RealTimeTelemetry')}
      </TextComponent>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <LiveMetricCard
          title={t('LiveMetricCard.NetworkThroughput')}
          value="4.2 GB/s"
          diff={12.5}
          data={mockData}
          subTitle={t('LiveMetricCard.liveStream')}
        />
        <LiveMetricCard
          title={t('LiveMetricCard.ActiveValidators')}
          value="12,840"
          diff={-2.4}
          data={mockData.reverse()}
          subTitle={t('LiveMetricCard.liveStream')}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default LiveMetricCardDemo;
