import React from 'react';
import { Modal } from '@mantine/core';
import ButtonComponent from './ButtonComponent';
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
      padding="sm"
      radius="lg"
      transitionProps={{ transition: 'fade', duration: 200 }}
      closeButtonProps={{
        icon: <X color={colors.textColor} />,
      }}
      classNames={{
        header: 'bg-background',
        title: 'text-textColor font-bold text-xl',
        content:
          'bg-background border-[1px] shadow-xl rounded-2xl border-solid border-primaryColor border-opacity-50',
        close: 'text-textColor hover:bg-primaryColor hover:bg-opacity-15 ',
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
              <div>{content}</div>
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
                  color={colors.whiteColor}
                  backgroundColor={colors.primaryColor}
                  borderColor={colors.primaryColor}
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
