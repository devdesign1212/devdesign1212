import { darkTheme, lightTheme } from '@/themes/colors';
import { showNotification } from '@mantine/notifications';
import { AlertTriangle, Check, Info, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const useNotify = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const notify = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
  ) => {
    const config = {
      success: { color: colors.primaryColor, icon: <Check size={16} /> },
      error: { color: colors.error, icon: <X size={16} /> },
      warning: {
        color: colors.warningColor,
        icon: <AlertTriangle size={16} />,
      },
      info: { color: colors.infoColor, icon: <Info size={16} /> },
    };

    showNotification({
      title,
      message,
      color: config[type].color,
      icon: config[type].icon,
      styles: () => ({
        root: {
          backgroundColor: colors.background,
          border: `1px solid ${colors.borderColor}`,
          borderRadius: '12px',
        },
        title: {
          fontSize: '14px',
          fontWeight: '800',
          lineHeight: '24px',
          color: colors.textColor,
        },
        description: {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '24px',
          color: colors.textSecondary,
        },
      }),
    });
  };
  return notify;
};

export default useNotify;
