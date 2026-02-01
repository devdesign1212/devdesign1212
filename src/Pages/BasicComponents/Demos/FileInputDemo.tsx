import { Group, Stack } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { CheckCircle2, FileType, UploadCloud } from 'lucide-react';
import FileInputComponent from '@/components/Atoms/FileInputComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import TextComponent from '@/components/Atoms/TextComponent';
import { useTranslation } from 'react-i18next';
import { showNotification } from '@/utils/notifications';

const FileInputDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { t } = useTranslation();

  const [idProof, setIdProof] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if (!idProof) {
      setError(t('FileUpload.requiredDocument'));
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showNotification('success', t('FileUpload.uploadSuccess'), 'Brilliant!');
    }, 2000);
  };

  return (
    <Stack align="center" gap="xl">
      <div className="mx-auto mt-1 max-w-md space-y-8">
        <FileInputComponent
          label={t('FileUpload.documentLabel')}
          placeholder={t('FileUpload.documentPlaceholder')}
          value={idProof}
          onChange={setIdProof}
          accept="image/png"
          withAsterisk
          variant="default"
          error={error}
          color={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          labelColor={colors.primaryColor}
        />
        <FileInputComponent
          label={t('FileUpload.profilePictureLabel')}
          placeholder={t('FileUpload.documentPlaceholder')}
          value={profilePic}
          onChange={setProfilePic}
          accept="image/jpeg"
          withAsterisk
          variant="filled"
          error={error}
          color={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          labelColor={colors.primaryColor}
        />

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {[
              { file: idProof, id: 'id-proof' },
              { file: profilePic, id: 'profile-pic' },
            ].map(
              item =>
                item.file && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="border-borderColor bg-card rounded-xl border border-dashed p-4"
                  >
                    <Group justify="space-between">
                      <Group gap="sm">
                        <div className="bg-primaryColor/10 rounded-lg p-2">
                          <FileType size={18} className="text-primaryColor" />
                        </div>
                        <div>
                          <TextComponent
                            fontSize={13}
                            fontWeight={600}
                            color={colors.textColor}
                            className="max-w-[180px] truncate"
                          >
                            {item.file.name}
                          </TextComponent>
                          <TextComponent
                            fontSize={10}
                            fontWeight={400}
                            color={colors.textSecondary}
                          >
                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                          </TextComponent>
                        </div>
                      </Group>
                      <CheckCircle2 size={18} className="text-success" />
                    </Group>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
        <ButtonComponent
          onClick={handleSubmit}
          disabled={isLoading}
          title={t('FileUpload.uploadButton')}
          rightIcon={<UploadCloud color={colors.whiteColor} />}
          className="w-full "
          color={colors.whiteColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
        />
        <TextComponent
          fontSize={11}
          fontWeight={400}
          color={colors.textSecondary}
          align="center"
          className="opacity-70"
        >
          {t('FileUpload.uploadInfo')}
        </TextComponent>
      </div>
    </Stack>
  );
};

export default FileInputDemo;
