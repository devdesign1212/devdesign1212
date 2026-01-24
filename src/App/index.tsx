import RouterOutlet from './Routes';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/themes/theme';
import { Notifications } from '@mantine/notifications';

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
    <>
      <AppContent />
    </>
  );
};

export default App;
