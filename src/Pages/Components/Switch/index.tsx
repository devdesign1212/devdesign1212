import { SwitchProps } from '@/Common/interface';
import { darkTheme, lightTheme } from '@/themes/colors';
import { SegmentedControl } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

const SegmentedControlComponent: React.FC<SwitchProps> = ({
  data,
  value,
  onChange,
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SegmentedControl
        fullWidth
        value={value}
        data={data}
        onChange={onChange}
        radius="xl"
        size="md"
        classNames={{
          root: 'bg-transparent border-2 border-borderColor p-1',
          indicator: 'bg-primaryColor shadow-lg shadow-primaryColor/20',
          label: 'font-bold tracking-tight transition-colors',
          control: 'border-none',
        }}
        styles={{
          label: {
            color: colors.textColor,
          },
        }}
      />
    </motion.div>
  );
};

export default SegmentedControlComponent;
