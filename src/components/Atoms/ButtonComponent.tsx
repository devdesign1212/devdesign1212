import React from 'react';
import { Button } from '@mantine/core';
import { darkTheme, lightTheme } from '../../themes/colors';
import TextComponent from './TextComponent';
import { useSelector } from 'react-redux';
import { ButtonComponentProps } from '@/Common/interface';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onClick,
  variant = 'filled',
  className,
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  size = 'sm',
  fullWidth = false,
  radius,
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      leftSection={leftIcon}
      rightSection={rightIcon}
      disabled={disabled}
      loading={loading}
      radius={radius || 16}
      size={size}
      fullWidth={fullWidth}
      className={`${className || ''}`}
      styles={{
        root: {
          backgroundColor:
            variant === 'filled' ? colors.buttonBg : 'transparent',
          borderColor: colors.buttonBg,
          '&:hover': {
            backgroundColor: variant === 'filled' ? '#A30002' : 'transparent',
            opacity: 0.8,
          },
          height: '100%',
          width: '100%',
          opacity: disabled ? 0.6 : 1,
          padding: 5,
        },
      }}
    >
      <TextComponent
        color={variant === 'filled' ? colors.whiteColor : colors.primaryColor}
        fontSize={20}
        fontWeight={600}
        align="center"
        className="py-6"
      >
        {title}
      </TextComponent>
    </Button>
  );
};

export default ButtonComponent;
