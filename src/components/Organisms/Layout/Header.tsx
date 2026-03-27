import { Group, ActionIcon, Menu, Button } from '@mantine/core';
import { Sun, Moon, Languages, Zap } from 'lucide-react';
import TextComponent from '@/components/Atoms/TextComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';

const CommandHeader = ({
  toggleTheme,
  selectLanguage,
  handleLanguageSelect,
}: any) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <header className="fixed top-0 z-[100] flex w-full items-center justify-between border-b border-borderColor px-6 py-2 backdrop-blur-md">
      <Group gap="xs" className="flex-row">
        <div className={`rounded-lg bg-primaryColor p-2`}>
          <Zap size={20} color={colors.whiteColor} fill={colors.whiteColor} />
        </div>
        <div>
          <TextComponent
            fontSize={22}
            fontWeight={900}
            color={colors.textColor}
            className="tracking-tighter"
          >
            DEV<span className="text-primaryColor">DESIGN</span>
          </TextComponent>
        </div>
      </Group>

      <Group gap="lg">
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <Button
              variant="subtle"
              color={colors.textColor}
              leftSection={<Languages size={16} />}
            >
              {selectLanguage}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleLanguageSelect('en')}>
              English
            </Menu.Item>
            <Menu.Item onClick={() => handleLanguageSelect('hi')}>
              Hindi
            </Menu.Item>
            <Menu.Item onClick={() => handleLanguageSelect('mr')}>
              Marathi
            </Menu.Item>
            <Menu.Item onClick={() => handleLanguageSelect('fr')}>
              Français
            </Menu.Item>
            <Menu.Item onClick={() => handleLanguageSelect('de')}>
              Deutsch
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <ActionIcon
          variant="filled"
          color={
            currentTheme === 'dark' ? colors.whiteColor : colors.primaryColor
          }
          size="lg"
          radius="md"
          onClick={toggleTheme}
        >
          {currentTheme === 'dark' ? (
            <Sun size={18} color={colors.blackColor} />
          ) : (
            <Moon size={18} />
          )}
        </ActionIcon>
      </Group>
    </header>
  );
};

export default CommandHeader;
