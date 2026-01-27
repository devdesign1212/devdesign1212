import { Stack } from '@mantine/core';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { ArrowRightSvgIcon, SendSvgIcon } from '@/assets/svg';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';

const ButtonDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Stack align="center" gap="xl">
      <ButtonComponent
        title="buttons.get_started"
        rightIcon={<ArrowRightSvgIcon color={colors.whiteColor} />}
        onClick={() => console.log("Let's go!")}
        fullWidth
        variant="filled"
        color={colors.whiteColor}
        backgroundColor={colors.primaryColor}
        borderColor={colors.primaryColor}
      />

      <ButtonComponent
        title="buttons.send_message"
        variant="outline"
        leftIcon={<SendSvgIcon color={colors.primaryColor} />}
        radius={50}
        color={colors.primaryColor}
        backgroundColor="transparent"
        borderColor={colors.primaryColor}
      />
      <ButtonComponent
        title="buttons.send_message"
        variant="gradient"
        leftIcon={<SendSvgIcon color={colors.whiteColor} />}
        radius={50}
        color={colors.whiteColor}
        from="teal"
        to="green"
        deg={20}
        borderColor={colors.primaryColor}
      />
      <ButtonComponent
        title="buttons.loading"
        loading={true}
        disabled
        color={colors.whiteColor}
        backgroundColor={colors.primaryColor}
        borderColor={colors.primaryColor}
      />
    </Stack>
  );
};

export default ButtonDemo;
