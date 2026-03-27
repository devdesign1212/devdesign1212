import { Stack } from '@mantine/core';
import DropdownComponent from '@/components/Atoms/DropdownComponent';
import { Globe, Shield } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';

const DropdownDemo = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [accessRole, setAccessRole] = useState<string | null>(null);
  const [selectedLangs, setSelectedLangs] = useState<string | null>(null);
  // const [region, setRegion] = useState<string | null>(null);

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
      <div className="mx-auto mt-1 max-w-md space-y-8 ">
        <DropdownComponent
          label={t('Dropdown.systemAccessRole')}
          data={roleData}
          value={accessRole}
          onChange={setAccessRole}
          leftSection={<Shield size={18} color={colors.textColor} />}
          variant="default"
          placeholder="Search"
          withAsterisk
          searchable
          withCheckIcon
          color={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          labelColor={colors.primaryColor}
        />

        <DropdownComponent
          label={t('Dropdown.preferredLanguage')}
          data={languages}
          value={selectedLangs}
          onChange={(val: any) => setSelectedLangs(val)}
          rightSection={<Globe size={18} color={colors.whiteColor} />}
          variant="filled"
          clearable
          color={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          labelColor={colors.primaryColor}
        />

        <DropdownComponent
          label={t('Dropdown.regionSimulatedError')}
          data={['North America', 'Europe', 'Asia']}
          // value={region}
          // onChange={setRegion}
          error={t('Dropdown.thisRegionIsCurrentlyUnderMaintenance')}
          withCheckIcon
          variant="default"
          color={colors.blackColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          labelColor={colors.primaryColor}
        />
      </div>
    </Stack>
  );
};

export default DropdownDemo;
