import { Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { CustomTextareaProps } from '@/Common/interface';

const TextareaComponent: React.FC<CustomTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  maxLength,
  minLength,
  autoComplete,
  name,
  id,
  className,
  style,
  radius,
  variant = 'default',
  withAsterisk,
  rows = 3,
  autosize = true,
  minRows = 3,
  maxRows = 10,
  ...props
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { height } = useViewportSize();
  const [isFocused, setIsFocused] = useState(false);

  const textareaStyles = {
    wrapper: {
      marginTop: height * 0.01,
      marginBottom: height * 0.01,
      width: '100%',
      height: 'auto',
    },
    input: {
      '&[dataInvalid="true"]': {
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

      '&:hover': {
        borderColor: colors.textColor,
        borderWidth: '1px',
        borderStyle: 'solid',
      },

      '&::placeholder': {
        color: colors.placeholderColor,
        fontSize: '16px',
        fontWeight: 500,
      },

      fontFamily: 'Manrope',
      backgroundColor: colors.transparent,
      borderColor: error
        ? colors.primaryColor
        : isFocused
          ? colors.textColor
          : colors.inActive,
      color: colors.textColor,
      padding: '10px 6px',
      borderWidth: '1px',
      fontSize: '12px',
      fontWeight: '500',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
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
    },
  };

  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      error={error}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      autoComplete={autoComplete}
      name={name}
      id={id}
      className={className}
      style={style}
      variant={variant}
      styles={textareaStyles}
      withErrorStyles={error ? true : false}
      withAsterisk={withAsterisk}
      rows={rows}
      autosize={autosize}
      minRows={minRows}
      maxRows={maxRows}
      {...props}
    />
  );
};

export default TextareaComponent;
