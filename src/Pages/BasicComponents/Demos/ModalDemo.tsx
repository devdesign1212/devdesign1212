import { Stack } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import ModalComponent from '@/components/Atoms/ModalComponent';
import { useState } from 'react';
import TextComponent from '@/components/Atoms/TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useTranslation } from 'react-i18next';

const ModalDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack align="center" gap="xl">
      <div className="flex flex-col items-center gap-4 ">
        <TextComponent
          fontSize={20}
          fontWeight={700}
          color={colors.textSecondary}
        >
          {t('Modal.title')}
        </TextComponent>

        <ButtonComponent
          title={t('Modal.openConfirmation')}
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          radius={50}
          color={colors.primaryColor}
          backgroundColor="transparent"
          borderColor={colors.primaryColor}
        />

        <ModalComponent
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t('Modal.finalizeAction')}
          content={
            <TextComponent
              fontSize={18}
              fontWeight={500}
              color={colors.textColor}
            >
              {t('Modal.confirmationMessage')}
            </TextComponent>
          }
          ButtonTitle={t('Modal.confirm')}
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    </Stack>
  );
};

export default ModalDemo;
