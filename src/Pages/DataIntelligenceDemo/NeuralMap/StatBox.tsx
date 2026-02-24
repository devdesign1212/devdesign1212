import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useSelector } from 'react-redux';

const StatBox = ({ label, value, isStatus }: any) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <div className="rounded-2xl border border-borderColor bg-card p-4 text-center">
      <TextComponent
        color={colors.textColor}
        fontSize={12}
        fontWeight={700}
        className="mb-1 uppercase "
      >
        {label}
      </TextComponent>
      <TextComponent
        color={isStatus ? colors.primaryColor : colors.textColor}
        fontSize={isStatus ? 20 : 28}
        fontWeight={900}
      >
        {value}
      </TextComponent>
    </div>
  );
};

export default StatBox;
