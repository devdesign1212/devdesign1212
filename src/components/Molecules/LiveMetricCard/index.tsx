import { MetricProps } from '@/Common/interface';
import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { Paper, Group, ThemeIcon, Stack } from '@mantine/core';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const LiveMetricCard = ({
  title,
  value,
  diff,
  data,
  subTitle,
}: MetricProps) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const isPositive = diff > 0;

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{
        background: 'rgba(10, 20, 18, 0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Group justify="apart">
        <Stack gap={0}>
          <TextComponent
            fontSize={12}
            fontWeight={700}
            color={colors.textSecondary}
            className="uppercase"
          >
            {title}
          </TextComponent>
          <TextComponent
            fontSize={16}
            fontWeight={700}
            color={colors.textColor}
          >
            {value}
          </TextComponent>
        </Stack>
        <ThemeIcon
          color={colors.grayColor}
          variant="light"
          radius="md"
          size="lg"
          style={{ color: isPositive ? colors.success : colors.maroon }}
        >
          {isPositive ? (
            <ArrowUpRight size="1.2rem" />
          ) : (
            <ArrowDownRight size="1.2rem" />
          )}
        </ThemeIcon>
      </Group>

      <Stack gap={0} mt="md">
        <div style={{ height: 40, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A67E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00A67E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00A67E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradientColor)"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Group justify="apart" mt={4}>
          <TextComponent
            fontSize={16}
            fontWeight={700}
            color={isPositive ? 'teal' : 'red'}
          >
            {isPositive ? '+' : ''}
            {diff}%
          </TextComponent>
          <TextComponent
            fontSize={12}
            fontWeight={700}
            color={colors.textSecondary}
            className="uppercase"
          >
            {subTitle}
          </TextComponent>
        </Group>
      </Stack>
    </Paper>
  );
};
