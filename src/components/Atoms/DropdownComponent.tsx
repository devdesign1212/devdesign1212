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
        classNames={{
          root: 'relative',
          wrapper: 'mt-1 mb-2',
          input: `h-[52px] rounded-xl border-2 transition-all duration-300 ease-in-out 
          ${
            error
              ? 'border-maroon'
              : isFocused
                ? borderColor
                : 'border-borderColor'
          }
            focus-within:ring-2  -translate-y-[1px] placeholder:text-textColor placeholder:opacity-80 
          `,
          label: `${error ? 'text-maroon' : labelColor} font-extrabold text-xs  mb-[6px] `,
          dropdown: `bg-whiteColor rounded-2xl border border-solid p-2 shadow-xl`,
          option: `rounded-lg text-sm transition-all  text-blackColor my-[2px] ease-in-out  
   hover:font-extrabold hover:text-2xl `,
          error: `text-maroon font-bold text-xs text-right mt-2 `,
        }}
        styles={{
          input: {
            backgroundColor:
              variant === 'default' ? 'transparent' : backgroundColor,
            color: variant === 'default' ? colors.textColor : colors.whiteColor,

            '&:focus, &:focus-within': {
              borderColor: borderColor,
            },
          },
          dropdown: {
            borderColor: error ? colors.maroon : borderColor,
          },
          option: {
            '&[data-selected]': {
              backgroundColor: backgroundColor,
              color: color,
            },
            '&[data-hovered]': {
              backgroundColor: colors.primaryColor,
              color: colors.whiteColor,
            },
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
