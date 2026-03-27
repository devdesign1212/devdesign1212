import { Stack, Title } from '@mantine/core';
import TextareaComponent from '@/components/Atoms/TextareaComponent';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';

const TextareaDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Stack align="center" gap="xl">
      <div className="flex flex-col items-center gap-4">
        <header className="mb-2 flex items-center gap-2">
          <MessageSquare size={24} className={colors.secondaryColor} />
          <Title order={4}>{t('Textarea.howCanWeHelp')}</Title>
        </header>

        <TextareaComponent
          label={t('Textarea.issueDescription')}
          placeholder={t('Textarea.tellUsWhatOnYourMind')}
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={500}
          minRows={5}
          withAsterisk
          className="w-full"
          variant="default"
          labelColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          backgroundColor={colors.primaryColor}
        />
        <TextareaComponent
          label={t('Textarea.issueDescription')}
          placeholder={t('Textarea.tellUsWhatOnYourMind')}
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={300}
          minRows={3}
          withAsterisk
          error={t('Textarea.min10Chars')}
          className="w-full"
          variant="filled"
          labelColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          backgroundColor={colors.primaryColor}
        />
      </div>
    </Stack>
  );
};

export default TextareaDemo;
