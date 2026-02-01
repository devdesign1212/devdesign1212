import { Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { CustomTextareaProps } from '@/Common/interface';

const TextareaComponent: React.FC<CustomTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
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
  labelColor,
  borderColor,
  backgroundColor,
  ...props
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [isFocused, setIsFocused] = useState(false);

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
      styles={{
        input: {
          borderRadius: radius ? radius : '12px',
          backgroundColor:
            variant === 'default' ? 'transparent' : backgroundColor,
          color: variant === 'default' ? colors.textColor : colors.whiteColor,

          '&:focus, &:focus-within': {
            borderColor: borderColor,
          },
        },
      }}
      withErrorStyles={error ? true : false}
      withAsterisk={withAsterisk}
      rows={rows}
      autosize={autosize}
      minRows={minRows}
      maxRows={maxRows}
      classNames={{
        wrapper: 'mb-1.5 mt-1.5',
        label: `${error ? 'text-maroon' : labelColor} mb-[6px] text-sm  font-semibold `,
        input: ` w-full
          h-[52px] border-2
          px-4 py-3 text-sm font-medium transition-all duration-300
         ${
           error
             ? 'border-maroon'
             : isFocused
               ? borderColor
               : 'border-borderColor'
         }
            focus-within:ring-2  -translate-y-[1px] placeholder:text-textColor placeholder:opacity-80 
          
        `,
        error: `text-maroon mt-2 text-right text-xs font-bold `,
      }}
      {...props}
    />
  );
};

export default TextareaComponent;
