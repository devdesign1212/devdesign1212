import React from 'react';
import { Modal } from '@mantine/core';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import TextComponent from '../Atoms/TextComponent';
import { useTranslation } from 'react-i18next';
import { LogoutModalProps } from '@/Common/interface';
import ButtonComponent from '../Atoms/ButtonComponent';

const LogoutModal: React.FC<LogoutModalProps> = ({
  opened,
  onClose,
  onClick,
  isLoading,
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      closeOnClickOutside={true}
      classNames={{
        root: 'bg-light-card_BG',
        content: 'border border-light-primaryColor rounded-md',
      }}
    >
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-2 ">
        <div className="flex h-full w-full items-center justify-center">
          {/* <LogoutModalSvg /> */}
        </div>
        <TextComponent
          fontSize={30}
          fontWeight={600}
          color={colors.textColor}
          align="center"
        >
          {t('alert')}
        </TextComponent>
        <TextComponent
          fontSize={18}
          fontWeight={500}
          color={colors.disableTextColor}
          align="center"
        >
          {t('doYouWantToLogout')}
        </TextComponent>
        <div className="flex w-56 gap-7 self-center">
          <ButtonComponent
            title={t('yes')}
            variant="filled"
            onClick={onClick}
            disabled={isLoading}
            radius={25}
          />
          <ButtonComponent
            title={t('no')}
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            radius={25}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
