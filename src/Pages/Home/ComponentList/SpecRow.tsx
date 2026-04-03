import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useSelector } from 'react-redux';

const SpecRow = ({ label, value }: { label: string; value: string }) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <div className="flex justify-between border-b border-borderColor pb-3 last:border-0">
      <TextComponent fontSize={11} fontWeight={700} color="gray">
        {label}
      </TextComponent>
      <TextComponent fontSize={12} fontWeight={600} color={colors.textColor}>
        {value}
      </TextComponent>
    </div>
  );
};

export default SpecRow;
