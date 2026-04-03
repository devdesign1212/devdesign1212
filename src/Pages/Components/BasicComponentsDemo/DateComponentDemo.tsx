import { Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import CustomDateComponent from '@/components/Atoms/CustomDateComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DateDemo = () => {
  const { t } = useTranslation();
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
      <div className="mx-auto mt-1 max-w-md space-y-8 ">
        <CustomDateComponent
          label={t('date.label1')}
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

        <CustomDateComponent
          label={t('date.label2')}
          type="default"
          placeholder={t('date.placeholder1')}
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

        <CustomDateComponent
          label={t('date.label2')}
          type="default"
          placeholder={t('date.placeholder2')}
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
    </Stack>
  );
};

export default DateDemo;
