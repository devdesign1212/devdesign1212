import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Maximize, QrCode } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const QRScanner = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [scanState, setScanState] = useState<
    'idle' | 'scanning' | 'found' | 'invalid'
  >('idle');

  const simulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      const outcome = Math.random() > 0.2 ? 'found' : 'invalid';
      setScanState(outcome);
    }, 2000);
  };

  return (
    <div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden p-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#008585 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <AnimatePresence mode="wait">
        {scanState === 'idle' || scanState === 'scanning' ? (
          <motion.div
            key="viewport"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative flex h-64 w-64 cursor-pointer items-center justify-center"
            onClick={simulateScan}
          >
            <motion.div
              animate={
                scanState === 'scanning'
                  ? { scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 1 }}
              className="border-primaryColor/40 absolute -inset-2 rounded-3xl border-2"
            />
            <Maximize
              className="absolute left-0 top-0 rotate-0 text-primaryColor"
              size={32}
              strokeWidth={1}
            />
            <Maximize
              className="absolute right-0 top-0 rotate-90 text-primaryColor"
              size={32}
              strokeWidth={1}
            />
            <Maximize
              className="absolute bottom-0 left-0 -rotate-90 text-primaryColor"
              size={32}
              strokeWidth={1}
            />
            <Maximize
              className="absolute bottom-0 right-0 rotate-180 text-primaryColor"
              size={32}
              strokeWidth={1}
            />

            <motion.div
              animate={
                scanState === 'scanning'
                  ? { opacity: [0.2, 0.5, 0.2] }
                  : { opacity: 0.1 }
              }
              className="text-textColor"
            >
              <QrCode size={120} strokeWidth={0.5} />
            </motion.div>

            {scanState === 'scanning' && (
              <motion.div
                className="absolute inset-x-4 z-20 h-[2px] bg-primaryColor shadow-[0_0_15px_#008585]"
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              />
            )}

            <div className="absolute -bottom-16 w-full text-center">
              <TextComponent
                fontSize={10}
                fontWeight={400}
                color={colors.textSecondary}
                className="uppercase tracking-[4px]"
              >
                {scanState === 'scanning'
                  ? t('QrScanner.AnalyzingDataStream')
                  : t('QrScanner.TapToInitializeCamera')}
              </TextComponent>
            </div>
          </motion.div>
        ) : scanState === 'found' ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-primaryColor"
          >
            <div className="bg-primaryColor/10 mb-6 rounded-full border border-primaryColor p-6 shadow-[0_0_30px_rgba(0,133,133,0.2)]">
              <CheckCircle2 size={60} />
            </div>
            <TextComponent
              fontSize={28}
              fontWeight={900}
              color={colors.textColor}
              className="uppercase tracking-widest"
            >
              {t('QrScanner.EncryptedKeyFound')}
            </TextComponent>

            <TextComponent
              fontSize={10}
              fontWeight={400}
              color={colors.textColor}
              className="mt-2 uppercase opacity-60"
            >
              {t('QrScanner.CorruptedOrUnknownQrSource')}
            </TextComponent>
            <TextComponent
              fontSize={10}
              fontWeight={400}
              color={colors.textColor}
              className="mt-2"
            >
              {t('QrScanner.Hash')}
            </TextComponent>

            <ButtonComponent
              onClick={() => setScanState('idle')}
              borderColor={colors.primaryColor}
              color={colors.textColor}
              title={t('QrScanner.ScanAnother')}
              className="mt-8 uppercase"
              variant="outline"
            />
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ x: [-10, 10, -10, 10, 0], opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-red-500"
          >
            <AlertTriangle size={60} className="mb-6" />
            <TextComponent
              fontSize={20}
              fontWeight={900}
              color={colors.textColor}
              className="tracking-widest"
            >
              {t('QrScanner.InvalidProtocol')}
            </TextComponent>

            <ButtonComponent
              onClick={() => setScanState('idle')}
              borderColor={colors.maroon}
              color={colors.textColor}
              title="Retry Scan"
              className="mt-8 uppercase"
              variant="outline"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRScanner;
