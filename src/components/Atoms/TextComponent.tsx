import React from 'react';
import { Text } from '@mantine/core';
import { CustomTextProps } from '@/Common/interface';

const TextComponent: React.FC<CustomTextProps> = ({
  fontSize,
  fontWeight,
  color,
  align,
  truncate = false,
  lineClamp,
  className,
  onClick = () => {},
  children,
  ...props
}) => {
  return (
    <Text
      style={{ fontSize: fontSize }}
      fw={fontWeight}
      c={color}
      truncate={truncate}
      lineClamp={lineClamp}
      className={className}
      onClick={onClick}
      ta={align}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
