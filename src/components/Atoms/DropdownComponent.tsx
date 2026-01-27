import React, { useEffect, useState } from 'react';
import { Group, Select } from '@mantine/core';
import { darkTheme, lightTheme } from '../../themes/colors';
import { useViewportSize } from '@mantine/hooks';
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
  disabled = false,
  required = false,
  searchable = false,
  clearable = false,
  withAsterisk = false,
  leftSection,
  rightSection,
  multiple = false,
  withCheckIcon = false,
  className,
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { height } = useViewportSize();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value === null || value === undefined) {
      setIsFocused(false);
    }
  }, [value]);

  const checkmarkVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
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
        placeholder={t('select')}
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
        multiple={multiple}
        defaultValue={value}
        renderOption={({ option, checked }) => (
          <Group gap="sm" justify="space-between" style={{ width: '100%' }}>
            <span>{option.label}</span>
            <AnimatePresence>
              {checked && (
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.primaryColor}
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
        comboboxProps={{
          transitionProps: { transition: 'pop-top-left', duration: 250 },
          shadow: 'xl',
          withinPortal: true,
        }}
        styles={() => ({
          root: {
            position: 'relative',
          },
          wrapper: {
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
            width: '100%',
          },
          input: {
            '&[data-invalid="true"]': {
              borderColor: colors.primaryColor,
              '&:hover': { borderColor: colors.primaryColor },
            },
            '&:focus, &:focus-within': {
              borderColor: colors.textColor,
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${colors.textColor}15`,
            },
            borderColor: error
              ? colors.primaryColor
              : isFocused
                ? colors.textColor
                : colors.inActive,
            padding: '10px 12px',
            borderWidth: '1px',
            borderRadius: '12px',
            fontSize: '16px',
            height: '48px',
            fontWeight: value ? 600 : 400,
            color: value ? colors.primaryColor : colors.textColor,
            backgroundColor: isFocused
              ? `${colors.primaryColor}05`
              : 'transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          label: {
            color: isFocused ? colors.primaryColor : colors.textColor,
            fontSize: '14px',
            fontWeight: 600,
            transition: 'color 0.2s ease',
            marginBottom: 4,
          },
          error: {
            color: colors.primaryColor,
            fontSize: '12px',
            fontWeight: 500,
            textAlign: 'right',
            marginTop: 4,
          },
          dropdown: {
            backgroundColor: colors.whiteColor,
            borderRadius: '12px',
            border: `1px solid ${colors.inActive}`,
            padding: '4px',
          },
          option: {
            borderRadius: '8px',
            margin: '2px 0',
            transition: 'all 0.2s ease',
            color: colors.textColor,
            '&[data-selected]': {
              backgroundColor: colors.primaryColor,
              color: colors.whiteColor,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: colors.whiteColor,
              },
            },
            '&[data-hovered]': {
              backgroundColor: currentTheme === 'light' ? '#F1F3F5' : '#2C2E33',
              transform: 'scale(1.02)',
              color: colors.primaryColor,
            },
          },
          section: {
            color: colors.textColor,
            width: '20%',
          },
        })}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            className="hidden"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DropdownComponent;
