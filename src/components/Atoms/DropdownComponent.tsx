import React, { useEffect, useState } from 'react';
import { Group, Select } from '@mantine/core';
import { darkTheme, lightTheme } from '../../themes/colors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CustomDropdownProps } from '@/Common/interface';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const DropdownComponent: React.FC<CustomDropdownProps> = ({
  label,
  data,
  value,
  onChange,
  error,
  variant = 'default',
  disabled = false,
  required = false,
  searchable = false,
  clearable = false,
  withAsterisk = false,
  leftSection,
  rightSection,
  withCheckIcon = false,
  className,
  placeholder,
  color,
  backgroundColor,
  borderColor,
  labelColor,
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value === null || value === undefined) {
      setIsFocused(false);
    }
  }, [value]);

  const checkmarkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Select
        label={label}
        placeholder={placeholder ? placeholder : t('Select Option...')}
        data={data}
        value={value || null}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        error={error}
        disabled={disabled}
        required={required}
        searchable={searchable}
        clearable={clearable}
        withAsterisk={withAsterisk}
        leftSection={leftSection}
        rightSection={rightSection}
        withCheckIcon={withCheckIcon}
        checkIconPosition="right"
        variant={variant}
        comboboxProps={{
          transitionProps: { transition: 'pop-top-left', duration: 250 },
          shadow: 'xl',
          withinPortal: true,
        }}
        renderOption={({ option, checked }) => (
          <Group gap="sm" justify="space-between" style={{ width: '100%' }}>
            <span
              className={`text-sm ${checked ? 'font-bold' : 'font-medium'}`}
            >
              {option.label}
            </span>
            <AnimatePresence>
              {checked && (
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </Group>
        )}
        styles={{
          root: { position: 'relative' },
          wrapper: { marginTop: 4, marginBottom: 8 },
          input: {
            height: '52px',
            borderRadius: '12px',
            borderWidth: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor:
              variant === 'default' ? 'transparent' : backgroundColor,
            color: color,
            borderColor: error
              ? colors.maroon
              : isFocused
                ? borderColor
                : colors.borderColor,
            '&:focus, &:focus-within': {
              borderColor: borderColor,
              transform: 'translateY(-1px)',
              boxShadow: `0 8px 20px ${borderColor}15`,
            },
            '&::placeholder': {
              color: colors.textColor,
              opacity: 0.6,
            },
          },
          label: {
            color: error ? colors.maroon : labelColor,
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: 6,
          },
          dropdown: {
            backgroundColor: colors.whiteColor,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          },
          option: {
            borderRadius: '10px',
            margin: '2px 0',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            color: colors.textColor,

            '&[data-selected]': {
              backgroundColor: `${backgroundColor}`,
              color: color,
              fontWeight: 700,
            },
            '&[data-hovered]': {
              backgroundColor: colors.primaryColor,
              color: colors.whiteColor,
            },
          },
          error: {
            color: colors.maroon,
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            textAlign: 'right',
            marginTop: 6,
          },
          section: {
            color: color,
          },
        }}
      />
    </motion.div>
  );
};

export default DropdownComponent;
