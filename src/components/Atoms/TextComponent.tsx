import React from 'react';
import { Text } from '@mantine/core';
import { CustomTextProps } from '@/Common/interface';
import { motion } from 'framer-motion';

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
  const isClickable = onClick && onClick !== (() => {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'inline-block', width: '100%' }}
    >
      <Text
        style={{
          fontSize: fontSize,
          transition: 'color 0.2s ease, font-weight 0.2s ease',
          cursor: isClickable ? 'pointer' : 'default',
        }}
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
    </motion.div>
  );
};

export default TextComponent;
