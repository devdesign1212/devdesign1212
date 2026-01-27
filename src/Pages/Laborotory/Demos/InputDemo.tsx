import { Paper, Stack, Title } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextInputComponent from '@/components/Atoms/TextInputComponent';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TextInputDemo = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <Stack align="center" gap="xl">
      <div className="mx-auto max-w-md p-10">
        <Paper shadow="xl" p="xl" radius="lg" withBorder>
          <Stack gap="md">
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
            />

            <TextInputComponent
              label={t('TextInput.password')}
              placeholder={t('TextInput.enterYourPassword')}
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={e => setPass(e.target.value)}
              leftSection={<Lock size={18} />}
              rightSection={
                <div
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              }
            />

            <ButtonComponent
              title={t('TextInput.signIn')}
              onClick={() => console.log(t('TextInput.loginAttempt'))}
              className="mt-4"
            />
          </Stack>
        </Paper>
      </div>
    </Stack>
  );
};

export default TextInputDemo;
