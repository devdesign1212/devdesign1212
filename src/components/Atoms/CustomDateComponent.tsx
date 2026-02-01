import React, { useEffect, useState } from 'react';
import { Popover, UnstyledButton } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { CustomDatePickerProps } from '@/Common/interface';
import TextComponent from './TextComponent';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useSelector } from 'react-redux';

const CustomDateComponent: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  error,
  label,
  defaultDate = false,
  type = 'default',
  disabled = false,
  className,
  withAsterisk,
  onShortcutSelect,
  dateFormat = 'YYYY-MM-DD',
  customButtons = false,
  inputMode = 'picker',
  placeholder,
  radius,
  variant = 'default',
  minDate,
  maxDate,
  color,
  backgroundColor,
  borderColor,
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

  const handleShortcut = (typeShortcut: string) => {
    let start: dayjs.Dayjs, end: dayjs.Dayjs;
    const today = dayjs();

    switch (typeShortcut) {
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

    if (type === 'range') {
      onChange([start.toDate(), end.toDate()]);
    } else {
      onChange(start.toDate());
    }

    if (onShortcutSelect) {
      onShortcutSelect(start.toDate(), end.toDate());
    }
    setOpened(false);
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
    const rawValue = e.target.value.replace(/[^0-9\- ]/g, '');

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
          const d = part.replace(/[^0-9]/g, '');
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
      const d = rawValue.replace(/[^0-9]/g, '');
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
          backgroundColor: backgroundColor,
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
          backgroundColor: backgroundColor,
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
          border: `1px solid ${borderColor}`,
          color: color,
          padding: '4px',
          borderRadius: '30px',
          textAlign: 'center',
        },
      };
    }

    if (date > maxDate) {
      return {
        style: {
          color: colors.inActive,
          padding: '4px',
          borderRadius: '40px',
        },
      };
    }

    return {
      style: {
        color: colors.blackColor,
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
        <div className="mt-1 flex w-max items-center gap-1 ">
          <TextComponent
            color={color}
            fontSize={14}
            fontWeight={600}
            className="w-max"
          >
            {label}
          </TextComponent>
          {withAsterisk && (
            <TextComponent color={colors.maroon} fontSize={14} fontWeight={600}>
              *
            </TextComponent>
          )}
        </div>
      )}
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-start"
        shadow="xl"
        radius={radius || 'md'}
      >
        <Popover.Target>
          <div onClick={() => !disabled && setOpened(o => !o)}>
            <motion.div
              whileHover={{ borderColor: borderColor }}
              className={`relative flex h-12 items-center rounded-xl border-2 px-3 transition-all `}
              style={{
                backgroundColor:
                  variant === 'default' ? 'transparent' : backgroundColor,
                borderColor: error
                  ? 'border-maroon'
                  : isFocused
                    ? borderColor
                    : `color-mix(in srgb, ${borderColor} 20%, transparent)`,
              }}
              onClick={() => !disabled && setOpened(o => !o)}
            >
              <Calendar
                size={18}
                color={
                  variant === 'default' ? colors.textColor : colors.whiteColor
                }
                className="mr-2"
              />
              <input
                type="text"
                value={inputValue}
                onChange={handleManualInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  placeholder
                    ? placeholder
                    : type === 'range'
                      ? dateFormat === 'YYYY-MM-DD'
                        ? 'YYYY-MM-DD - YYYY-MM-DD'
                        : 'DD-MM-YYYY - DD-MM-YYYY'
                      : dateFormat === 'YYYY-MM-DD'
                        ? 'YYYY-MM-DD'
                        : 'DD-MM-YYYY'
                }
                disabled={disabled}
                style={{ border: borderColor }}
                className={`${variant === 'default' ? 'text-textColor' : 'text-whiteColor'} flex-grow cursor-text bg-transparent outline-none ${error ? 'placeholder:text-maroon' : 'placeholder:text-inActive '} placeholder:text-[16px] placeholder:font-normal  `}
                onClick={e => {
                  e.stopPropagation();
                  if (
                    inputMode === 'picker' ||
                    (inputMode === 'both' && !disabled)
                  )
                    setOpened(o => !o);
                }}
                readOnly={inputMode === 'picker'}
              />
              {inputValue && (
                <X
                  size={16}
                  color={
                    variant === 'default' ? colors.textColor : colors.whiteColor
                  }
                  className="cursor-pointer opacity-50 hover:opacity-100"
                  onClick={handleClear}
                />
              )}
            </motion.div>
          </div>
        </Popover.Target>

        <Popover.Dropdown className="flex flex-row gap-4">
          <DatePicker
            type={type}
            size="xl"
            value={value}
            onChange={handlePickerChange}
            maxDate={maxDate || new Date()}
            minDate={minDate}
            withCellSpacing={false}
            getDayProps={getDayProps}
            variant={variant}
            nextIcon={<ChevronRight size={18} />}
            previousIcon={<ChevronLeft size={18} />}
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
              weekday: 'text-primaryColor',
              monthRow: 'flex items-center justify-between w-full gap-3',
              monthCell: 'w-full text-center text-primaryColor ',
              monthsList: 'w-full',
              monthsListControl: 'text-textColor font-[400] text-[18px]',
              yearsListRow: 'flex items-center justify-between w-full gap-3',
              yearsListControl: 'text-textColor font-[400] text-[18px]',
              day: 'font-[500] text-[14px] w-[30px] text-center ',
            }}
          />
          {customButtons && (
            <div
              className="flex flex-col gap-2 border-l pl-4"
              style={{ borderColor: borderColor }}
            >
              <TextComponent
                fontSize={12}
                fontWeight={700}
                color={colors.textSecondary}
                className="mb-2 uppercase tracking-tighter"
              >
                {t('date.shortcuts')}
              </TextComponent>
              {['today', 'yesterday', 'last7', 'last30', 'thisMonth'].map(
                key => (
                  <UnstyledButton
                    key={key}
                    onClick={() => {
                      handleShortcut(key);
                      console.log('key', key);
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:translate-x-1 `}
                    style={{
                      backgroundColor: `color-mix(in srgb, ${backgroundColor} 10%, transparent)`,
                      color: color,
                    }}
                  >
                    {t(`date.${key}`)}
                  </UnstyledButton>
                ),
              )}
            </div>
          )}
        </Popover.Dropdown>
      </Popover>

      {error && (
        <div className="xt-[12px] text-maroon text-right font-[400]">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomDateComponent;
