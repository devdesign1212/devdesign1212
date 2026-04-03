import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MousePointer2,
  List,
  Calendar,
  FileCode,
  Type,
  AlignLeft,
  Menu as MenuIcon,
  LayoutIcon,
  Activity,
  BellRing,
  Split,
  BrainCircuit,
  ScanHeart,
  ScanQrCode,
  PercentDiamondIcon,
  MessageCirclePlusIcon,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useComponent } from '@/Context/ComponentContext';
import GlobalSearch from '@/components/Molecules/GlobalSearch';
import ButtonDemo from '@/Pages/Components/BasicComponentsDemo/ButtonDemo';
import TextInputDemo from '@/Pages/Components/BasicComponentsDemo/InputDemo';
import DropdownDemo from '@/Pages/Components/BasicComponentsDemo/DropdownDemo';
import DateDemo from '@/Pages/Components/BasicComponentsDemo/DateComponentDemo';
import FileInputDemo from '@/Pages/Components/BasicComponentsDemo/FileInputDemo';
import ModalDemo from '@/Pages/Components/BasicComponentsDemo/ModalDemo';
import TextareaDemo from '@/Pages/Components/BasicComponentsDemo/TextareaDemo';
import MenuDemo from '@/Pages/Components/BasicComponentsDemo/MenuDemo';
import LiveMetricCardDemo from '@/Pages/Components/LiveMetric/LiveMetricCardDemo';
import IntelligenceTableDemo from '@/Pages/Components/Table/IntelligenceTableDemo';
import FeedbackDemo from '@/Pages/Components/Feedback/FeedbackDemo';
import SwitchDemo from '@/Pages/Components/Switch/SwitchDemo';
import NeuralMap from '@/Pages/Components/NeuralMap';
import BioScanner from '@/Pages/Components/Scanner/BioScanner';
import QRScanner from '@/Pages/Components/Scanner/QRScanner';
import ChatLab from '@/Pages/Components/Chat';
import SecureGate from '@/Pages/Components/SecureGate';
import Components from './Components';
import DetailComponent from './DetailComponent';

const LaboratoryGallery = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { setComponents, activePortal, setActivePortal } = useComponent();
  const { componentId } = useParams();
  const location = useLocation();

  const showSearch = location.pathname === '/component-lab';

  const componentsList = useMemo(
    () => [
      {
        id: 'Button',
        label: t('Layout.InteractionTokens'),
        sub: t('Layout.ButtonsTriggers'),
        icon: <MousePointer2 />,
        view: <ButtonDemo />,
        span: 2,
      },
      {
        id: 'TextInput',
        label: t('Layout.DataEntry'),
        sub: t('Layout.InputsValidation'),
        icon: <Type />,
        view: <TextInputDemo />,
        span: 1,
      },
      {
        id: 'Dropdown',
        label: t('Layout.SelectionLogic'),
        sub: t('Layout.DropdownsLists'),
        icon: <List />,
        view: <DropdownDemo />,
        span: 1,
      },
      {
        id: 'Date',
        label: t('Layout.TemporalUnits'),
        sub: t('Layout.DateTimePickers'),
        icon: <Calendar />,
        view: <DateDemo />,
        span: 1,
      },
      {
        id: 'FileUpload',
        label: t('Layout.AssetStream'),
        sub: t('Layout.FileUploaders'),
        icon: <FileCode />,
        view: <FileInputDemo />,
        span: 2,
      },
      {
        id: 'Modal',
        label: t('Layout.OverlayPrototypes'),
        sub: t('Layout.ModalsDrawers'),
        icon: <LayoutIcon />,
        view: <ModalDemo />,
        span: 1,
      },
      {
        id: 'Textarea',
        label: t('Layout.ContentBlocks'),
        sub: t('Layout.RichTextAreas'),
        icon: <AlignLeft />,
        view: <TextareaDemo />,
        span: 1,
      },
      {
        id: 'Menu',
        label: t('Layout.NavigationNodes'),
        sub: t('Layout.ContextMenus'),
        icon: <MenuIcon />,
        view: <MenuDemo />,
        span: 1,
      },
      {
        id: 'LiveMetrics',
        label: t('Layout.LiveMetrics'),
        sub: t('Layout.RealTimeAnalytics'),
        icon: <Activity />,
        view: <LiveMetricCardDemo />,
        span: 2,
      },
      {
        id: 'Table',
        label: t('Layout.IntelligenceRegistry'),
        sub: t('Layout.RealTimeAnalytics'),
        icon: <Activity />,
        view: <IntelligenceTableDemo />,
        span: 2,
      },
      {
        id: 'Toast',
        label: t('feedback.FeedbackNodes'),
        sub: t('feedback.ToastsSystemAlerts'),
        icon: <BellRing />,
        view: <FeedbackDemo />,
        span: 1,
      },
      {
        id: 'Switch',
        label: t('Switch.SwitchNodes'),
        sub: t('Switch.LogicSwitchers'),
        icon: <Split />,
        view: <SwitchDemo />,
        span: 1,
      },
      {
        id: 'NeuralMap',
        label: t('NuralMap.NeuralNetwork'),
        sub: t('NuralMap.NodeMapping'),
        icon: <BrainCircuit />,
        view: <NeuralMap />,
        span: 1,
      },
      {
        id: 'BioScanner',
        label: t('BioScanner.BiometricAnalysis'),
        sub: t('BioScanner.VitalNodeSync'),
        icon: <ScanHeart />,
        view: <BioScanner />,
        span: 2,
      },
      {
        id: 'QRScanner',
        label: t('QrScanner.SecureScanner'),
        sub: t('QrScanner.DataStreamAnalysis'),
        icon: <ScanQrCode />,
        view: <QRScanner />,
        span: 1,
      },
      {
        id: 'SocketLab',
        label: t('SocketLab.SocketLab'),
        sub: t('SocketLab.DataStreamAnalysis'),
        icon: <MessageCirclePlusIcon />,
        view: <ChatLab />,
        span: 1,
      },
      {
        id: 'secureGate',
        label: t('Security'),
        sub: t('QrScanner.DataStreamAnalysis'),
        icon: <PercentDiamondIcon />,
        view: <SecureGate />,
        span: 1,
      },
    ],
    [t],
  );

  useEffect(() => {
    setComponents(componentsList);
  }, [componentsList, setComponents]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!showSearch) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showSearch]);

  useEffect(() => {
    if (componentId) {
      setActivePortal(componentId);
    }
  }, [componentId, setActivePortal]);

  return (
    <Box className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden bg-background p-6 md:p-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${colors.primaryColor} 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <AnimatePresence mode="wait">
        {!activePortal ? (
          <Components
            ArrowOnClick={() => navigate('/')}
            components={componentsList}
            dataOnClick={comp => {
              setActivePortal(comp.id);
              navigate(`/component-lab/${comp.id}`);
            }}
          />
        ) : (
          <DetailComponent
            ArrowClick={() => {
              setActivePortal(null);
              navigate('/component-lab');
            }}
            components={componentsList}
            activePortal={activePortal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {paletteOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaletteOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="fixed left-1/2 top-[20%] z-[201] w-[520px] -translate-x-1/2 overflow-hidden rounded-2xl border border-borderColor bg-background shadow-2xl"
            >
              <GlobalSearch
                dataOnclick={cmd => {
                  setActivePortal(cmd.id);
                  navigate(`/component-lab/${cmd.id}`);
                  setPaletteOpen(false);
                }}
                header={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LaboratoryGallery;
