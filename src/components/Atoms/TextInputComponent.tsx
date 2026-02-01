import { TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { CustomTextInputProps } from '@/Common/interface';
import { motion } from 'framer-motion';

const TextInputComponent: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  required = false,
  maxLength,
  minLength,
  withAsterisk = false,
  className,
  leftSection,
  rightSection,
  variant,
  labelColor,
  borderColor,
  backgroundColor,
  radius,
  color,
  ...props
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;

    if (maxLength && newValue.length > maxLength) {
      if (onChange) onChange(event);
      return;
    }

    if (minLength && newValue.length < minLength) {
      if (onChange) onChange(event);
      return;
    }

    if (onChange) onChange(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        error={error}
        disabled={disabled}
        type={type}
        required={required}
        variant={variant}
        maxLength={maxLength}
        minLength={minLength}
        withAsterisk={withAsterisk}
        label={label}
        leftSection={leftSection}
        rightSection={rightSection}
        {...props}
        classNames={{
          root: 'relative w-full',
          label: `text-sm font-black tracking-widest mb-2 transition-colors
                  ${error ? 'text-maroon' : isFocused ? 'text-primaryColor' : labelColor}`,
          wrapper: ` w-full
            h-[52px] rounded-xl border-2 transition-all duration-300 !ease-in-out pl-12 pr-12
            ${
              error
                ? 'border-maroon'
                : isFocused
                  ? 'border-primaryColor -translate-y-[1px] shadow-lg shadow-primaryColor/10'
                  : 'border-borderColor hover:border-primaryColor/50'
            }
             
          `,
          input: `
          
            h-full border-none bg-transparent text-textColor font-medium text-sm bg-red-500 `,
          section: `transition-colors ${isFocused ? 'text-primaryColor' : 'text-textSecondary'} `,
          error:
            'text-maroon font-bold text-[10px] uppercase text-right mt-1.5',
        }}
        styles={{
          wrapper: {
            borderRadius: radius ? radius : '12px',
            backgroundColor:
              variant === 'default' ? 'transparent' : backgroundColor,
            color: variant === 'default' ? colors.textColor : colors.whiteColor,

            '&:focus, &:focus-within': {
              borderColor: borderColor,
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

export default TextInputComponent;
