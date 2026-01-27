import { Card, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import CustomDateComponent from '@/components/Atoms/CustomDateComponent';
import { useState } from 'react';

const DateDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [dateValue, setDateValue] = useState<
    [Date | null, Date | null] | Date | null
  >([new Date(new Date().setDate(new Date().getDate() - 7)), new Date()]);

  return (
    <Stack align="center" gap="xl">
      <div className="min-h-screen bg-light-background p-8 dark:bg-dark-background">
        <Card
          radius="lg"
          padding="xl"
          className="mb-6 border border-gray-100 shadow-sm"
        >
          <div className="w-full md:w-96">
            <CustomDateComponent
              label="Date Range"
              type="range"
              value={dateValue}
              onChange={val => setDateValue(val)}
              customButtons={true}
              withAsterisk
              dateFormat="DD-MM-YYYY"
            />
          </div>
          <div className="w-full md:w-96">
            <CustomDateComponent
              label="Date"
              type="default"
              placeholder="Select "
              value={dateValue}
              onChange={val => setDateValue(val)}
              customButtons={true}
              withAsterisk
              dateFormat="DD-MM-YYYY"
            />
          </div>
        </Card>
      </div>
    </Stack>
  );
};

export default DateDemo;
