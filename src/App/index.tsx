import RouterOutlet from './Routes';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/themes/theme';
import { Notifications } from '@mantine/notifications';
import { store } from '@/Redux/Store/store';
import { Provider } from 'react-redux';
import { ThemeColorInjector } from '@/utils/ThemeInjector';

const AppContent = () => {
  return (
    <MantineProvider theme={theme}>
      <ThemeColorInjector />
      <Notifications position="top-right" zIndex={10000} />
      <RouterOutlet />
    </MantineProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
