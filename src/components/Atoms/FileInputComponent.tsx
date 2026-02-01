import { FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { customFileinputProps } from '@/Common/interface';
import { motion, AnimatePresence } from 'framer-motion';
import { File as FileIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  borderColor,
  labelColor,
  color,
  backgroundColor,
  variant = 'default',
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <FileInput
        label={label}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        error={error}
        disabled={disabled}
        accept={accept}
        withAsterisk={withAsterisk}
        variant={variant}
        clearable
        leftSection={
          <motion.div
            animate={internalValue ? { y: [0, -4, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <FileIcon
              size={20}
              color={
                variant === 'default' ? colors.textColor : colors.whiteColor
              }
            />
          </motion.div>
        }
        classNames={{
          root: 'relative ',
          wrapper: 'mt-1 mb-2',
          label: `${error ? 'text-maroon' : labelColor} font-extrabold text-xs mb-[6px] `,
          input: `
            h-[52px] rounded-xl border-2 transition-all duration-300 p-3
             cursor-pointer px-9 font-medium text-sm
            ${
              error
                ? 'border-maroon'
                : isFocused
                  ? borderColor
                  : 'border-borderColor'
            }
                focus-within:ring-2  -translate-y-[1px] placeholder:text-textColor placeholder:opacity-80
          `,
          error: `text-maroon font-bold text-xs text-right mt-2 `,
        }}
        styles={() => ({
          input: {
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
        })}
      />

      <AnimatePresence>
        {internalValue && !error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              fontSize: '11px',
              color: '#40C057',
              fontWeight: 600,
              marginTop: -5,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#40C057',
              }}
            />
            {t('fileReadyForUpload')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileInputComponent;
