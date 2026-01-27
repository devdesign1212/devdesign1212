import RouterOutlet from './Routes';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/themes/theme';
import { Notifications } from '@mantine/notifications';
import { store } from '@/Redux/Store/store';
import { Provider } from 'react-redux';

const AppContent = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={2077} />
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
