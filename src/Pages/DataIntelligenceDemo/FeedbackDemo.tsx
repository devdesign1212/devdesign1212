import ButtonComponent from '@/components/Atoms/ButtonComponent';
import useNotify from '@/components/Molecules/NotificationProvider';
import { darkTheme, lightTheme } from '@/themes/colors';
import { Group, Stack } from '@mantine/core';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const FeedbackDemo = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const notify = useNotify();
  return (
    <Stack gap="md" p="md">
      <Group justify="center">
        <ButtonComponent
          title={t('feedback.TriggerSuccess')}
          leftIcon={<CheckCircle size={18} />}
          onClick={() =>
            notify(
              t('feedback.TransactionVerified'),
              t('feedback.Thehashhasbeensuccessfullyrecordedonchain'),
              'success',
            )
          }
          variant="outline"
          color={colors.primaryColor}
          borderColor={colors.primaryColor}
          backgroundColor={colors.whiteColor}
        />
        <ButtonComponent
          title={t('feedback.SystemAlert')}
          leftIcon={<ShieldAlert size={18} />}
          onClick={() =>
            notify(
              t('feedback.SecurityBreach'),
              t('feedback.UnauthorizedaccessdetectedinNode04'),
              'error',
            )
          }
          variant="filled"
          backgroundColor={colors.primaryColor}
          color={colors.whiteColor}
          borderColor={colors.primaryColor}
        />
      </Group>
    </Stack>
  );
};

export default FeedbackDemo;
