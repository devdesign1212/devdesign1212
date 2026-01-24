import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { darkTheme, lightTheme } from '../../themes/colors';
import { useViewportSize } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CustomDropdownProps } from '@/Common/interface';

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

  return (
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
      comboboxProps={{
        transitionProps: { transition: 'fade-down', duration: 200 },
      }}
      className={className}
      styles={() => ({
        wrapper: {
          marginTop: height * 0.01,
          marginBottom: height * 0.01,
          width: '100%',
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
          backgroundColor: colors.transparent,
          borderColor: error
            ? colors.primaryColor
            : isFocused
              ? colors.textColor
              : colors.inActive,
          color: colors.textColor,
          padding: '10px 10px',
          borderWidth: '1px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 400,
          transition: 'all 0.3s ease',
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
        dropdown: {
          backgroundColor: colors.card_BG,
        },
        item: {
          '&[data-selected]': {
            backgroundColor: colors.primaryColor,
            color: colors.whiteColor,
          },
          '&[data-hovered]': {
            backgroundColor: colors.blueColor,
          },
          color: colors.textColor,
        },
        section: {
          color: colors.textColor,
        },
        option: {
          color: colors.textColor,
        },
      })}
    />
  );
};

export default DropdownComponent;
