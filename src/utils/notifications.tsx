import { notifications } from '@mantine/notifications';
import { CheckCircle2, AlertCircle, Bell } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'notify';

export const showNotification = (
  type: NotificationType,
  message: string,
  title?: string,
) => {
  const config = {
    success: {
      color: 'teal',
      icon: <CheckCircle2 size={18} />,
      defaultTitle: 'Success',
      className: 'border-l-4 border-primaryColor',
    },
    error: {
      color: 'red',
      icon: <AlertCircle size={18} />,
      defaultTitle: 'Error',
      className: 'border-l-4 border-maroon',
    },
    notify: {
      color: 'blue',
      icon: <Bell size={18} />,
      defaultTitle: 'Notification',
      className: 'border-l-4 border-blue-500',
    },
  };

  const selected = config[type];

  notifications.show({
    title: title || selected.defaultTitle,
    message: message,
    icon: selected.icon,
    color: selected.color,
    withCloseButton: true,
    classNames: {
      root: `bg-background rounded-xl shadow-2xl ${selected.className}`,
      title: 'text-textColor font-bold text-sm',
      description: 'text-textSecondary text-xs',
      closeButton: 'hover:bg-primaryColor/10 text-textColor',
    },
  });
};
