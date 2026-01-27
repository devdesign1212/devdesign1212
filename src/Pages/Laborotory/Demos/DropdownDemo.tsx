import { Stack } from '@mantine/core';
import DropdownComponent from '@/components/Atoms/DropdownComponent';
import { Globe, Shield } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DropdownDemo = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState<string | null>('admin');
  const [lang, setLang] = useState<string | null>('en');

  const roleData = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Content Editor' },
    { value: 'viewer', label: 'Guest Viewer' },
  ];

  const languages = [
    { value: 'en', label: 'English (US)' },
    { value: 'fr', label: 'French (FR)' },
    { value: 'de', label: 'German (DE)' },
  ];

  return (
    <Stack align="center" gap="xl">
      <div className="mx-auto max-w-md space-y-8 p-10">
        <DropdownComponent
          label={t('Dropdown.systemAccessRole')}
          data={roleData}
          value={role}
          onChange={setRole}
          leftSection={<Shield size={18} />}
          withAsterisk
          searchable
        />

        <DropdownComponent
          label={t('Dropdown.preferredLanguage')}
          data={languages}
          value={lang}
          onChange={setLang}
          leftSection={<Globe size={18} />}
          clearable
        />

        <DropdownComponent
          label={t('Dropdown.regionSimulatedError')}
          data={['North America', 'Europe', 'Asia']}
          error={t('Dropdown.thisRegionIsCurrentlyUnderMaintenance')}
          withCheckIcon
        />
      </div>
    </Stack>
  );
};

export default DropdownDemo;
