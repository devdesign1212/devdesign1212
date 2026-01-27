import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BurgerProps } from '@/Common/interface';

const CustomBurgerComponent: React.FC<BurgerProps> = ({
  opened,
  onClick,
  color,
  label = 'menu.devDesign',
  textColor,
}) => {
  const { t } = useTranslation();

  const variantTop = {
    closed: { d: 'M 2 2.5 L 20 2.5' },
    opened: { d: 'M 3 16.5 L 17 2.5' },
  };

  const variantCenter = {
    closed: { opacity: 1, x: 0 },
    opened: { opacity: 0, x: 20 },
  };

  const variantBottom = {
    closed: { d: 'M 2 9.423 L 20 9.423' },
    opened: { d: 'M 3 2.5 L 17 16.346' },
  };

  return (
    <div className="mx-3 flex flex-col items-center justify-center gap-1">
      <button
        onClick={onClick}
        className="group relative flex h-10 w-10 items-center justify-center transition-all focus:outline-none"
        aria-label={t(label)}
      >
        <motion.div
          className={`bg-light-${color} dark:bg-dark-${color} absolute inset-0 scale-50 rounded-xl opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-10`}
        />

        <svg width="23" height="18" viewBox="0 0 23 18">
          <motion.path
            fill="transparent"
            strokeWidth="2.5"
            stroke={color}
            strokeLinecap="round"
            variants={variantTop}
            animate={opened ? 'opened' : 'closed'}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2.5"
            stroke={color}
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={variantCenter}
            animate={opened ? 'opened' : 'closed'}
            transition={{ duration: 0.1 }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2.5"
            stroke={color}
            strokeLinecap="round"
            variants={variantBottom}
            animate={opened ? 'opened' : 'closed'}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        </svg>
      </button>

      <motion.span
        initial={false}
        animate={{
          opacity: opened ? 1 : 0.5,
          y: opened ? -2 : 0,
        }}
        className={`text-light-${textColor} dark:text-dark-${textColor} text-[19px] font-black uppercase tracking-[0.2em]`}
      >
        {opened ? t('menu.devDesign') : t('menu.devDesign')}
      </motion.span>
    </div>
  );
};

export default CustomBurgerComponent;
