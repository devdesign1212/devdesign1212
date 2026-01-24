import { TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { CustomTextInputProps } from '@/Common/interface';

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
      className={className}
      leftSection={leftSection}
      rightSection={rightSection}
      styles={() => ({
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
          color: colors.textColor,
          paddingVertical: '4px',
          paddingLeft: leftSection ? '15%' : '6px',
          paddingRight: rightSection ? '15%' : '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          "&[dataInvalid='true']": {
            borderColor: colors.primaryColor,
            '&:hover': {
              borderColor: colors.primaryColor,
            },
          },
          '&:focus, &:focusWithin': {
            borderColor: colors.textColor,
            borderWidth: '1px',
            borderStyle: 'solid',
          },
        },
        input: {
          color: colors.textColor,
          alignItems: 'flex-start',
        },
        label: {
          color: colors.textColor,
          fontSize: '14px',
          fontWeight: 600,
        },
        error: {
          color: colors.primaryColor,
          fontSize: '12px',
          fontWeight: 400,
          textAlign: 'right',
        },
        section: {
          width: '15%',
        },
      })}
    />
  );
};

export default TextInputComponent;
