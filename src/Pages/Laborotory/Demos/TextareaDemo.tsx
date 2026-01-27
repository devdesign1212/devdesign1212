import { Paper, Stack, Title } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextareaComponent from '@/components/Atoms/TextareaComponent';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TextareaDemo = () => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [Texterror, setTextError] = useState('');

  const handleTextareaSubmit = () => {
    if (comment.length < 10) {
      setTextError(t('Textarea.min10Chars'));
    } else {
      setTextError('');
      alert(t('Textarea.feedbackSubmitted'));
    }
  };

  return (
    <Stack align="center" gap="xl">
      <div className="mx-auto max-w-lg p-10">
        <Paper shadow="md" p="xl" radius="lg" withBorder>
          <Stack gap="md">
            <header className="mb-2 flex items-center gap-3">
              <MessageSquare size={24} className="text-blue-500" />
              <Title order={4}>{t('Textarea.howCanWeHelp')}</Title>
            </header>

            <TextareaComponent
              label={t('Textarea.issueDescription')}
              placeholder={t('Textarea.tellUsWhatOnYourMind')}
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={500}
              minRows={4}
              withAsterisk
              error={Texterror}
            />

            <ButtonComponent
              title={t('Textarea.submit')}
              onClick={handleTextareaSubmit}
              className="mt-2 w-full"
            />
          </Stack>
        </Paper>
      </div>
    </Stack>
  );
};

export default TextareaDemo;
