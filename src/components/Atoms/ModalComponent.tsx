import React from 'react';
import { Modal } from '@mantine/core';
import ButtonComponent from './ButtonComponent';
import TextComponent from './TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicModalProps } from '@/Common/interface';
import { X } from 'lucide-react';

const ModalComponent: React.FC<DynamicModalProps> = ({
  opened,
  onClose,
  title,
  content,
  ButtonTitle,
  onClick,
}) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      padding="xl"
      radius="lg"
      transitionProps={{ transition: 'fade', duration: 200 }}
      closeButtonProps={{
        icon: <X color={colors.textColor} />,
      }}
      styles={{
        header: {
          backgroundColor: colors.whiteColor,
        },
        title: {
          color: colors.textColor,
          fontWeight: 700,
          fontSize: '20px',
        },
        content: {
          backgroundColor: colors.whiteColor,
          border: `1px solid ${colors.primaryColor}50`,
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        },
        close: {
          color: colors.textColor,
          '&:hover': { backgroundColor: `${colors.primaryColor}15` },
        },
      }}
    >
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex w-full flex-col items-center justify-center gap-6 text-center"
          >
            <div className="py-2">
              <TextComponent
                fontSize={18}
                fontWeight={500}
                color={colors.textColor}
              >
                {content}
              </TextComponent>
            </div>

            {ButtonTitle && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-[150px]"
              >
                <ButtonComponent
                  title={ButtonTitle}
                  variant="filled"
                  onClick={onClick}
                  radius={100}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ModalComponent;
