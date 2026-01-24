import { FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { customFileinputProps } from '@/Common/interface';
import { FileSvgIcon } from '@/assets/svg';

const FileInputComponent: React.FC<customFileinputProps> = ({
  label,
  placeholder,
  value,
  onChange = () => {},
  error,
  disabled,
  withAsterisk,
  accept,
  className,
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { height } = useViewportSize();
  const [isFocused, setIsFocused] = useState(false);

  const [internalValue, setInternalValue] = useState<File | null>(null);

  useEffect(() => {
    if (value === null || value === undefined) {
      setInternalValue(null);
      setIsFocused(false);
    } else if (value instanceof File) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (file: File | null) => {
    setInternalValue(file);
    onChange(file);
  };

  return (
    <FileInput
      label={label}
      placeholder={placeholder}
      value={internalValue}
      onChange={handleChange}
      onBlur={() => setIsFocused(true)}
      onFocus={() => setIsFocused(false)}
      error={error}
      disabled={disabled}
      accept={accept}
      withAsterisk={withAsterisk}
      clearable
      leftSection={<FileSvgIcon />}
      className={className}
      styles={() => ({
        wrapper: {
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
          borderRadius: '8px',
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
            backgroundColor: colors.transparent,
          },
          transition: 'all 0.3s ease',
          paddingLeft: '30px',
        },
        input: {
          color: colors.textColor,
          backgroundColor: colors.transparent,
          padding: '7px 10px',
          paddingLeft: '30px',
          border: 'none',
          outline: 'none',
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
      })}
    />
  );
};

export default FileInputComponent;
