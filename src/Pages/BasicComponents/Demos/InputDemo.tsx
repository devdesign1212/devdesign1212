import { Stack, Title } from '@mantine/core';
import TextInputComponent from '@/components/Atoms/TextInputComponent';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';

const TextInputDemo = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <Stack align="center" gap="xl">
      <div className="flex flex-col items-center gap-4">
        <Title order={3} ta="center">
          {t('TextInput.welcomeBack')}
        </Title>

        <TextInputComponent
          label={t('TextInput.emailAddress')}
          placeholder={t('TextInput.emailPlaceholder')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          leftSection={<Mail size={18} />}
          required
          variant="default"
          labelColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          color={colors.primaryColor}
        />

        <TextInputComponent
          label={t('TextInput.password')}
          placeholder={t('TextInput.enterYourPassword')}
          type={showPass ? 'text' : 'password'}
          value={pass}
          onChange={e => setPass(e.target.value)}
          leftSection={<Lock size={18} color={colors.whiteColor} />}
          variant="filled"
          labelColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          color={colors.whiteColor}
          rightSection={
            <div
              onClick={() => setShowPass(!showPass)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {showPass ? (
                <EyeOff size={18} color={colors.whiteColor} />
              ) : (
                <Eye size={18} color={colors.whiteColor} />
              )}
            </div>
          }
        />
      </div>
    </Stack>
  );
};

export default TextInputDemo;
