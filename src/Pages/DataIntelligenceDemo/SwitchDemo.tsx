import TextComponent from '@/components/Atoms/TextComponent';
import useNotify from '@/components/Molecules/NotificationProvider';
import SegmentedControlComponent from '@/components/Molecules/SegmentedControl';
import { darkTheme, lightTheme } from '@/themes/colors';
import { Center, Stack } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SwitchDemo = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [section, setSection] = useState('analytics');
  const notify = useNotify();

  const switchData = [
    { label: t('Switch.Analytics'), value: 'analytics' },
    { label: t('Switch.Security'), value: 'security' },
    { label: t('Switch.RawCode'), value: 'code' },
  ];

  const activeNode = switchData.find(item => item.value === section);

  const handleSwitch = (val: string) => {
    setSection(val);
    const selectedNode = switchData.find(item => item.value === val);
    notify(
      t('Switch.SelectionChanged'),
      `${t('Switch.NodeActivated')}: ${selectedNode?.label.toUpperCase()}`,
      'info',
    );
  };

  return (
    <Stack gap="xl" p="md">
      <SegmentedControlComponent
        value={section}
        onChange={handleSwitch}
        data={switchData}
      />
      <Center
        h={100}
        className="rounded-2xl border-2 border-dashed border-borderColor p-4"
      >
        <TextComponent
          fontSize={18}
          fontWeight={900}
          color={colors.textSecondary}
        >
          {t('Switch.CurrentView')}: {activeNode?.label.toUpperCase()}
        </TextComponent>
      </Center>
    </Stack>
  );
};

export default SwitchDemo;
