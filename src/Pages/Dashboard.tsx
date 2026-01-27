import MainCommandCenter from './MultiCommandScreen';

const Dashboard = () => {
  // const currentTheme = useSelector((state: any) => state.theme.theme);
  // const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-slate-100 dark:bg-slate-900">
      <MainCommandCenter />
    </div>
  );
};

export default Dashboard;

// Floating Glassmorphism Header
// we build a "Glassmorphism Login Card" with an animated security fingerprint
