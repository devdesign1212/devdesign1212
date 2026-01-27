import { FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { customFileinputProps } from '@/Common/interface';
import { motion, AnimatePresence } from 'framer-motion';
import { File } from 'lucide-react';
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
}) => {
  const { t } = useTranslation();
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
        clearable
        leftSection={
          <motion.div
            animate={internalValue ? { y: [0, -4, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <File size={20} color={colors.primaryColor} />
          </motion.div>
        }
        styles={() => ({
          root: {
            position: 'relative',
          },
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
            borderRadius: '12px', 
            backgroundColor: isFocused
              ? `${colors.primaryColor}05`
              : 'transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            paddingLeft: '10px', 
            overflow: 'hidden',
          },
          input: {
            color: colors.textColor,
            backgroundColor: 'transparent',
            padding: '10px 10px',
            paddingLeft: '35px',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
            '&::placeholder': {
              transition: 'opacity 0.2s ease',
              opacity: isFocused ? 0.5 : 1,
            },
          },
          label: {
            color: isFocused ? colors.primaryColor : colors.textColor,
            fontSize: '14px',
            fontWeight: 600,
            transition: 'color 0.2s ease',
            marginBottom: 4,
          },
          error: {
            color: colors.primaryColor,
            fontSize: '12px',
            fontWeight: 500,
            textAlign: 'right',
            marginTop: 4,
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
