import { Group, Paper, Stack, Title } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { CheckCircle2, ShieldCheck, UploadCloud } from 'lucide-react';
import FileInputComponent from '@/components/Atoms/FileInputComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import TextComponent from '@/components/Atoms/TextComponent';
import { useTranslation } from 'react-i18next';

const FileInputDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const [document, setDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!document) {
      setError(t('FileUpload.requiredDocument'));
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(t('FileUpload.fileUploadedSuccessfully'));
    }, 2000);
  };

  return (
    <Stack align="center" gap="xl">
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-xl"
        >
          <Paper shadow="xl" p="xl" radius="md" withBorder>
            <Stack gap="xl">
              <header className="text-center">
                <div className="mb-4 inline-flex rounded-full bg-blue-50 p-3">
                  <ShieldCheck size={32} className="text-blue-600" />
                </div>

                <Title order={3}>{t('FileUpload.identityVerification')}</Title>
                <TextComponent
                  fontSize={14}
                  fontWeight={400}
                  color={colors.textSecondary}
                  className="mt-1"
                >
                  {t('FileUpload.uploadInstruction')}
                </TextComponent>
              </header>

              <FileInputComponent
                label={t('FileUpload.documentLabel')}
                placeholder={t('FileUpload.documentPlaceholder')}
                value={document}
                onChange={setDocument}
                accept=".pdf,image/*"
                withAsterisk
                error={error}
              />

              <AnimatePresence>
                {document && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-3"
                  >
                    <Group justify="space-between">
                      <Group gap="xs">
                        <CheckCircle2 size={16} className="text-green-600" />
                        <TextComponent
                          fontSize={12}
                          fontWeight={500}
                          color={colors.textSecondary}
                          className="max-w-[200px] truncate"
                        >
                          {document.name}
                        </TextComponent>
                      </Group>
                      <TextComponent
                        fontSize={10}
                        fontWeight={400}
                        color={colors.textSecondary}
                      >
                        {(document.size / 1024 / 1024).toFixed(2)} MB
                      </TextComponent>
                    </Group>
                  </motion.div>
                )}
              </AnimatePresence>

              <ButtonComponent
                isLoading={isLoading}
                onClick={handleSubmit}
                disabled={isLoading}
                title={t('FileUpload.uploadButton')}
                rightIcon={<UploadCloud color={colors.whiteColor} />}
                className="w-full"
              />
              <TextComponent
                fontSize={11}
                fontWeight={400}
                color={colors.textSecondary}
                align="center"
              >
                {t('FileUpload.uploadInfo')}
              </TextComponent>
            </Stack>
          </Paper>
        </motion.div>
      </div>
    </Stack>
  );
};

export default FileInputDemo;
