import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover, UnstyledButton } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { darkTheme, lightTheme } from '../../themes/colors';
import { CustomDatePickerProps } from '@/Common/interface';
import {
  CalendarSvgIcon,
  LeftDateArrowSvgIcon,
  RightDateArrowSvgIcon,
} from '@/assets/svg';
import TextComponent from './TextComponent';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const CustomDateComponent: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  error,
  label,
  defaultDate = false,
  type,
  disabled = false,
  className,
  withAsterisk,
  onShortcutSelect,
  dateFormat = 'YYYY-MM-DD',
  customButtons = false,
  inputMode = 'picker',
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [opened, setOpened] = useState(false);

  const formatDate = (date: Date, format: string) => {
    if (!date) return '';
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return format === 'YYYY-MM-DD' ? `${y}-${m}-${d}` : `${d}-${m}-${y}`;
  };

  function parseDate(str: string, format: string) {
    if (!str) return null;
    if (format === 'YYYY-MM-DD') {
      const [y, m, d] = str.split('-');
      return new Date(Number(y), Number(m) - 1, Number(d));
    } else {
      const [d, m, y] = str.split('-');
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
  }

  const handleShortcut = (type: string) => {
    let start, end;
    const today = dayjs();
    switch (type) {
      case 'today':
        start = end = today;
        break;
      case 'yesterday':
        start = end = today.subtract(1, 'day');
        break;
      case 'last7':
        start = today.subtract(6, 'day');
        end = today;
        break;
      case 'last30':
        start = today.subtract(29, 'day');
        end = today;
        break;
      case 'thisMonth':
        start = today.startOf('month');
        end = today;
        break;
      default:
        return;
    }
    if (onShortcutSelect) {
      onShortcutSelect(start.toDate(), end.toDate());
    }
  };

  useEffect(() => {
    const format = dateFormat || 'YYYY-MM-DD';
    if (!value && defaultDate) {
      const today = new Date();
      onChange(today);
    } else if (value) {
      if (type === 'range' && Array.isArray(value)) {
        let formatted = '';
        if (value[0] && value[1]) {
          formatted = `${formatDate(value[0], format)} - ${formatDate(value[1], format)}`;
        } else if (value[0]) {
          formatted = formatDate(value[0], format);
        } else if (value[1]) {
          formatted = formatDate(value[1], format);
        }
        setInputValue(formatted);
      } else if (value instanceof Date) {
        const formatted = formatDate(value, format);
        setInputValue(formatted);
      }
    }
  }, [value, type, dateFormat]);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const format = dateFormat || 'YYYY-MM-DD';
    let rawValue = e.target.value.replace(/[^0-9\- ]/g, '');

    let formattedValue = rawValue;
    if (type === 'range') {
      formattedValue = formattedValue.replace(/\s+/g, '');

      const dateLen = format === 'YYYY-MM-DD' ? 10 : 10;

      if (formattedValue.length > dateLen && !formattedValue.includes(' - ')) {
        formattedValue =
          formattedValue.slice(0, dateLen) +
          ' - ' +
          formattedValue.slice(dateLen);
      }
      const parts = formattedValue.split(' - ').slice(0, 2);
      formattedValue = parts
        .map(part => {
          let d = part.replace(/[^0-9]/g, '');
          if (format === 'YYYY-MM-DD') {
            if (d.length <= 4) return d;
            if (d.length <= 6) return `${d.slice(0, 4)}-${d.slice(4)}`;
            return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
          } else {
            if (d.length <= 2) return d;
            if (d.length <= 4) return `${d.slice(0, 2)}-${d.slice(2)}`;
            return `${d.slice(0, 2)}-${d.slice(2, 4)}-${d.slice(4, 8)}`;
          }
        })
        .join(' - ');
    } else {
      let d = rawValue.replace(/[^0-9]/g, '');
      if (format === 'YYYY-MM-DD') {
        if (d.length <= 4) formattedValue = d;
        else if (d.length <= 6)
          formattedValue = `${d.slice(0, 4)}-${d.slice(4)}`;
        else
          formattedValue = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
      } else {
        if (d.length <= 2) formattedValue = d;
        else if (d.length <= 4)
          formattedValue = `${d.slice(0, 2)}-${d.slice(2)}`;
        else
          formattedValue = `${d.slice(0, 2)}-${d.slice(2, 4)}-${d.slice(4, 8)}`;
      }
    }

    setInputValue(formattedValue);

    const regex =
      format === 'YYYY-MM-DD' ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{2}-\d{2}-\d{4}$/;

    if (type === 'range' && formattedValue.includes(' - ')) {
      const [startStr, endStr] = formattedValue
        .split(' - ')
        .map(str => str.trim());
      if (regex.test(startStr) && regex.test(endStr)) {
        const start = parseDate(startStr, format);
        const end = parseDate(endStr, format);
        onChange([start, end]);
      }
    } else if (type !== 'range' && regex.test(formattedValue)) {
      const date = parseDate(formattedValue, format);
      onChange(date);
    }
  };

  const handlePickerChange = (
    date: Date | Date[] | [Date | null, Date | null] | null,
  ) => {
    if (type === 'range') {
      if (Array.isArray(date) && date.length === 2) {
        if (date[0] && date[1]) {
          onChange([date[0] ?? null, date[1] ?? null]);
          setOpened(false);
        } else {
          onChange([date[0] ?? null, date[1] ?? null]);
        }
      } else {
        onChange([null, null]);
      }
    } else {
      onChange(date instanceof Date ? date : null);
      setOpened(false);
    }
  };

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const maxDate = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const isSelected =
      type === 'range'
        ? Array.isArray(value) && value.some(v => v && isSameDay(v, date))
        : value instanceof Date && isSameDay(value, date);

    const isInRange =
      type === 'range' && Array.isArray(value) && value[0] && value[1]
        ? date > value[0] && date < value[1]
        : false;

    if (isSelected) {
      return {
        style: {
          backgroundColor: colors.primaryColor,
          color: colors.whiteColor,
          padding: '6px',
          borderRadius: '40px',
          textAlign: 'center',
        },
      };
    }

    if (isInRange) {
      return {
        style: {
          backgroundColor: colors.primaryColor,
          color: colors.whiteColor,
          padding: '6px',
          borderRadius: '30px',
          textAlign: 'center',
        },
      };
    }

    if (isSameDay(date, today)) {
      return {
        style: {
          border: `1px solid ${colors.primaryColor}`,
          color: colors.primaryColor,
          padding: '4px',
          borderRadius: '30px',
          textAlign: 'center',
        },
      };
    }

    if (date > maxDate) {
      return {
        style: {
          color: colors.borderColor,
          padding: '4px',
          borderRadius: '40px',
        },
      };
    }

    return {
      style: {
        color: colors.textColor,
        padding: '2px',
        borderRadius: '40px',
      },
    };
  };

  const handleClear = () => {
    if (type === 'range') {
      onChange([null, null]);
      if (onShortcutSelect) onShortcutSelect(null, null);
    } else {
      onChange(null);
      if (onShortcutSelect) onShortcutSelect(null, null);
    }
    setInputValue('');
  };

  return (
    <div className={` ${className}`}>
      {label && (
        <div className="mt-1 flex items-center gap-1">
          <TextComponent
            color={colors.textColor}
            fontSize={14}
            fontWeight={600}
          >
            {label}
          </TextComponent>
          {withAsterisk && (
            <TextComponent
              color={colors.primaryColor}
              fontSize={14}
              fontWeight={600}
            >
              *
            </TextComponent>
          )}
        </div>
      )}
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-start"
        shadow="md"
      >
        <Popover.Target>
          <div
            className={`relative mt-2 flex h-10 cursor-pointer items-center rounded-md border ${error ? 'border-light-primaryColor' : isFocused ? 'border-light-textColor' : 'border-light-inActive'} pl-2 ${disabled ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => !disabled && setOpened(o => !o)}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleManualInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={
                type === 'range'
                  ? dateFormat === 'YYYY-MM-DD'
                    ? 'YYYY-MM-DD - YYYY-MM-DD'
                    : 'DD-MM-YYYY - DD-MM-YYYY'
                  : dateFormat === 'YYYY-MM-DD'
                    ? 'YYYY-MM-DD'
                    : 'DD-MM-YYYY'
              }
              disabled={disabled}
              className={`flex-grow cursor-text bg-transparent text-light-textColor outline-none ${error ? 'placeholder:text-light-primaryColor' : 'placeholder:text-light-inActive'} placeholder:text-[16px] placeholder:font-normal  `}
              onClick={e => {
                e.stopPropagation();
                if (inputMode === 'picker' && !disabled) setOpened(o => !o);
              }}
              readOnly={inputMode === 'picker'}
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-12 flex cursor-pointer items-center text-base text-light-lightRed"
                aria-label="Clear date"
              >
                X
              </button>
            )}
            <div className="absolute -right-1 flex items-center">
              <CalendarSvgIcon />
            </div>
          </div>
        </Popover.Target>

        <Popover.Dropdown className="flex flex-row gap-4">
          <DatePicker
            type={type}
            size="xl"
            value={value}
            onChange={handlePickerChange}
            maxDate={new Date()}
            withCellSpacing={false}
            nextIcon={<RightDateArrowSvgIcon />}
            previousIcon={<LeftDateArrowSvgIcon />}
            getDayProps={getDayProps}
            classNames={{
              levelsGroup: 'w-full ',
              calendarHeader: 'flex items-center justify-between gap-3',
              calendarHeaderLevel: 'font-[600] text-[16px] ',
              month: 'flex items-center justify-center flex-col gap-2 w-full',
              monthThead: 'flex items-center justify-center w-full',
              monthTbody:
                'flex items-center justify-center w-full flex-col gap-2',
              weekdaysRow: 'flex items-center justify-between w-full',
              monthsListRow: 'flex items-center justify-between w-full gap-3',
              weekday: 'text-light-primaryColor',
              monthRow: 'flex items-center justify-between w-full gap-3',
              monthCell: 'w-full text-center ',
              monthsList: 'w-full',
              monthsListControl: 'text-light-textColor font-[400] text-[18px]',
              yearsListRow: 'flex items-center justify-between w-full gap-3',
              yearsListControl: 'text-light-textColor font-[400] text-[18px]',
              day: 'font-[500] text-[14px] w-[30px] text-center ',
            }}
          />
          {customButtons && (
            <div className=" flex flex-col  border-l-2 border-light-lightPink">
              <div className="ml-4 flex flex-col gap-2">
                <div className="flex w-32 items-center justify-center justify-self-end rounded-md border border-light-lightRed bg-light-whiteColor px-2 py-1">
                  <UnstyledButton
                    onClick={() => handleShortcut('today')}
                    className="flex flex-row items-center justify-center text-center disabled:opacity-30"
                  >
                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.blackColor}
                      align="center"
                    >
                      {t('Today')}
                    </TextComponent>
                  </UnstyledButton>
                </div>
                <div className=" flex w-32 items-center justify-center justify-self-end rounded-md border border-light-lightRed bg-light-whiteColor px-2 py-1">
                  <UnstyledButton
                    onClick={() => handleShortcut('yesterday')}
                    className="flex flex-row items-center justify-center text-center disabled:opacity-30"
                  >
                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.blackColor}
                      align="center"
                    >
                      {t('Yesterday')}
                    </TextComponent>
                  </UnstyledButton>
                </div>
                <div className=" flex w-32 items-center justify-center justify-self-end rounded-md border border-light-lightRed bg-light-whiteColor px-2 py-1">
                  <UnstyledButton
                    onClick={() => handleShortcut('last7')}
                    className="flex flex-row items-center justify-center text-center disabled:opacity-30"
                  >
                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.blackColor}
                      align="center"
                    >
                      {t('Last7Days')}
                    </TextComponent>
                  </UnstyledButton>
                </div>
                <div className=" flex w-32 items-center justify-center justify-self-end rounded-md border border-light-lightRed bg-light-whiteColor px-2 py-1">
                  <UnstyledButton
                    onClick={() => handleShortcut('last30')}
                    className="flex flex-row items-center justify-center text-center disabled:opacity-30"
                  >
                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.blackColor}
                      align="center"
                    >
                      {t('Last30Days')}
                    </TextComponent>
                  </UnstyledButton>
                </div>
                <div className=" flex w-32 items-center justify-center justify-self-end rounded-md border border-light-lightRed bg-light-whiteColor px-2 py-1">
                  <UnstyledButton
                    onClick={() => handleShortcut('thisMonth')}
                    className="flex flex-row items-center justify-center text-center disabled:opacity-30"
                  >
                    <TextComponent
                      fontSize={16}
                      fontWeight={400}
                      color={colors.blackColor}
                      align="center"
                    >
                      {t('ThisMonth')}
                    </TextComponent>
                  </UnstyledButton>
                </div>
              </div>
            </div>
          )}
        </Popover.Dropdown>
      </Popover>

      {error && (
        <div className="te xt-[12px] text-right font-[400] text-light-primaryColor">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomDateComponent;
