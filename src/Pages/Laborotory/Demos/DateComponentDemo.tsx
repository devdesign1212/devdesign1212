import { Card, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import CustomDateComponent from '@/components/Atoms/CustomDateComponent';
import { useState } from 'react';

const DateDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [rangeValue, setRangeValue] = useState<
    [Date | null, Date | null] | Date | null
  >([new Date(new Date().setDate(new Date().getDate() - 7)), new Date()]);
  const [singleManualDate, setSingleManualDate] = useState<Date | null>(
    new Date(),
  );
  const [singleHybridDate, setSingleHybridDate] = useState<Date | null>(null);

  return (
    <Stack align="center" gap="xl">
      <div className="min-h-screen bg-light-background p-8 dark:bg-dark-background">
        <Card
          radius="lg"
          padding="xl"
          className="mb-6 gap-3 border border-gray-100 shadow-sm"
        >
          <div className="w-full md:w-96">
            <CustomDateComponent
              label="Date Range"
              type="range"
              value={rangeValue}
              onChange={val => setRangeValue(val)}
              customButtons={true}
              withAsterisk
              dateFormat="DD-MM-YYYY"
              color={colors.primaryColor}
              backgroundColor={colors.primaryColor}
              borderColor={colors.primaryColor}
              variant="default"
              inputMode="picker"
            />
          </div>
          <div className="w-full md:w-96">
            <CustomDateComponent
              label="Date"
              type="default"
              placeholder="Enter"
              value={singleManualDate}
              onChange={val => {
                if (!Array.isArray(val)) setSingleManualDate(val);
              }}
              customButtons={true}
              withAsterisk
              dateFormat="YYYY-MM-DD"
              color={colors.primaryColor}
              backgroundColor={colors.primaryColor}
              borderColor={colors.primaryColor}
              variant="filled"
              inputMode="manual"
            />
          </div>
          <div className="w-full md:w-96">
            <CustomDateComponent
              label="Date"
              type="default"
              placeholder="Select/Enter"
              value={singleHybridDate}
              onChange={val => {
                if (!Array.isArray(val)) setSingleHybridDate(val);
              }}
              customButtons={true}
              withAsterisk
              dateFormat="YYYY-MM-DD"
              color={colors.primaryColor}
              backgroundColor={colors.primaryColor}
              borderColor={colors.primaryColor}
              variant="default"
              inputMode="both"
            />
          </div>
        </Card>
      </div>
    </Stack>
  );
};

export default DateDemo;
