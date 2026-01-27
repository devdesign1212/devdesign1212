import React, { useRef } from 'react';
import { Button } from '@mantine/core';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TextComponent from './TextComponent';
import { ButtonComponentProps } from '@/Common/interface';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onClick,
  color,
  backgroundColor,
  borderColor,
  variant = 'filled',
  className,
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'sm',
  radius,
  from,
  to,
  deg,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const distanceX = e.clientX - (rect.left + rect.width / 2);
      const distanceY = e.clientY - (rect.top + rect.height / 2);
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    }
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{ x: springX, y: springY, width: fullWidth ? '100%' : 'auto' }}
      className="group relative p-2"
    >
      <div
        className={`bg-light-${backgroundColor} dark:bg-dark-${backgroundColor} absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
      />

      <Button
        onClick={onClick}
        variant={variant}
        disabled={disabled}
        loading={loading}
        fullWidth={fullWidth}
        className={`relative overflow-hidden ${className}`}
        gradient={{ from: from || 'teal', to: to || 'green', deg: deg || 90 }}
        styles={{
          root: {
            height: size || 54,
            padding: '0 32px',
            backgroundColor: backgroundColor,
            color: color,
            borderColor: borderColor,
            borderRadius: radius ? `${radius}px` : '12px',
            borderStyle: 'solid',
            transition: 'all 0.3s ease',
            '&:active': { transform: 'scale(0.97)' },
          },
          inner: {
            gap: '12px',
          },
        }}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {leftIcon && (
            <motion.span
              animate={{ y: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {leftIcon}
            </motion.span>
          )}

          <TextComponent
            color={color}
            fontSize={14}
            fontWeight={800}
            className="uppercase tracking-[1.5px]"
          >
            {t(title)}
          </TextComponent>

          {rightIcon && (
            <motion.span
              animate={!disabled ? { x: [0, 4, 0] } : {}}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            >
              {rightIcon}
            </motion.span>
          )}
        </div>

        {!disabled && (
          <motion.div
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`absolute inset-0 skew-x-[35deg] bg-light-${backgroundColor} dark:bg-dark-${backgroundColor} `}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default ButtonComponent;
