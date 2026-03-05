import { Group, Container, ActionIcon, Stack } from '@mantine/core';
import TextComponent from '@/components/Atoms/TextComponent';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { GithubSvgIcon, InstagramSvgIcon, YTSvgIcon } from '@/assets/svg';

const CommandFooter = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <footer className="bg-card/30 mt-10 border-t border-borderColor py-4 backdrop-blur-sm">
      <Container size="xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Stack gap={4}>
            <TextComponent
              fontSize={18}
              fontWeight={900}
              color={colors.textColor}
            >
              DEV<span className="text-primaryColor">DESIGN</span>
            </TextComponent>
            <TextComponent
              fontSize={12}
              color={colors.textSecondary}
              fontWeight={500}
            >
              © {t('footer.copyright')}
            </TextComponent>
          </Stack>

          <Group gap="xl">
            <ActionIcon
              component="a"
              href="https://youtube.com/@devdesign"
              target="_blank"
              variant="subtle"
              size="xl"
              color="red"
            >
              <YTSvgIcon />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://instagram.com/devdesign1212"
              target="_blank"
              variant="subtle"
              size="xl"
              color="pink"
            >
              <InstagramSvgIcon />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://github.com"
              target="_blank"
              variant="subtle"
              size="xl"
              color="gray"
            >
              <GithubSvgIcon />
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </footer>
  );
};

export default CommandFooter;
