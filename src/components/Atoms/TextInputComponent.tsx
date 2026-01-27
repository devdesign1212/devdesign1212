import { TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
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
  ...props
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { height } = useViewportSize();
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
        maxLength={maxLength}
        minLength={minLength}
        withAsterisk={withAsterisk}
        label={label}
        leftSection={leftSection}
        rightSection={rightSection}
        {...props}
        styles={() => ({
          root: {
            position: 'relative',
          },
          wrapper: {
            backgroundColor: colors.whiteColor,
            marginTop: height * 0.01,
            marginBottom: height * 0.01,

            width: '100%',
            borderColor: error
              ? colors.primaryColor
              : isFocused
                ? colors.textColor
                : colors.inActive,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '12px',

            color: colors.textColor,
            boxShadow: isFocused ? `0 4px 12px ${colors.textColor}15` : 'none',
            transform: isFocused ? 'translateY(-1px)' : 'none',

            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            paddingLeft: leftSection ? '40px' : '10px',
            paddingRight: rightSection ? '40px' : '10px',

            "&[dataInvalid='true']": {
              borderColor: colors.primaryColor,
              '&:hover': {
                borderColor: colors.primaryColor,
              },
            },
            '&:focus, &:focusWithin': {
              borderColor: colors.textColor,
            },
          },
          input: {
            color: colors.textColor,
            height: '46px',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            backgroundColor: 'transparent',
            '&::placeholder': {
              color: colors.inActive,
              opacity: 0.6,
            },
          },
          label: {
            color: isFocused ? colors.primaryColor : colors.textColor,
            fontSize: 's14px',
            fontWeight: 600,
            marginBottom: 4,
            transition: 'color 0.2s ease',
          },
          error: {
            color: colors.primaryColor,
            fontSize: '12px',
            fontWeight: 500,
            textAlign: 'right',
            marginTop: 4,
          },
          section: {
            width: '40px',
            color: isFocused ? colors.primaryColor : colors.inActive,
            transition: 'color 0.2s ease',
          },
        })}
      />
    </motion.div>
  );
};

export default TextInputComponent;
