import React from 'react';
import { Modal } from '@mantine/core';
import ButtonComponent from './ButtonComponent';
import TextComponent from './TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { DynamicModalProps } from '@/Common/interface';
import { ModalCrossSvgIcon } from '@/assets/svg';

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
      closeButtonProps={{
        icon: <ModalCrossSvgIcon color={colors.textColor} />,
        className: 'border-none',
      }}
      classNames={{
        root: 'bg-light-card_BG',
        content: 'border border-light-primaryColor rounded-md',
      }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <div>
          <TextComponent
            fontSize={18}
            fontWeight={600}
            color={colors.textColor}
          >
            {content}
          </TextComponent>
        </div>
        {ButtonTitle && (
          <div className="w-[30%]">
            <ButtonComponent
              title={ButtonTitle}
              variant="filled"
              onClick={onClick}
              radius={100}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;
