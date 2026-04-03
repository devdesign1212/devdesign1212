import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { Group, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';

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

export default StatBox;
