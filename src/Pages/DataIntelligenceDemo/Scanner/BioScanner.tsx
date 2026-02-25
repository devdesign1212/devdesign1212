import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { AnimatePresence, motion } from 'framer-motion';
import { Fingerprint, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const BioScanner = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [status, setStatus] = useState<
    'idle' | 'scanning' | 'success' | 'failed'
  >('idle');

  const handleStart = () => {
    if (status === 'scanning') return;
    setStatus('scanning');

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      setStatus(isSuccess ? 'success' : 'failed');
    }, 3000);
  };

  const glitchAnimation = {
    x: [0, -5, 5, -2, 2, 0],
    y: [0, 2, -2, 1, -1, 0],
    filter: [
      'hue-rotate(0deg) contrast(100%)',
      'hue-rotate(90deg) contrast(150%)',
      'hue-rotate(-90deg) contrast(200%)',
      'hue-rotate(0deg) contrast(100%)',
    ],
  };

  return (
    <div className="bg-cards relative flex min-h-[450px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-borderColor p-12 ">
      <AnimatePresence mode="wait">
        {(status === 'idle' || status === 'scanning') && (
          <motion.div
            key="scanner-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleStart}
            className="relative z-10 cursor-pointer p-10"
          >
            <Fingerprint
              size={100}
              className={
                status === 'scanning' ? 'text-primaryColor' : 'text-textColor'
              }
            />
            {status === 'scanning' && (
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-primaryColor shadow"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.div>
        )}

        {status === 'failed' && (
          <motion.div
            key="glitch-ui"
            animate={glitchAnimation}
            transition={{ duration: 0.2, repeat: 5 }}
            className="z-10 flex flex-col items-center text-maroon"
          >
            <div className="relative">
              <ShieldAlert
                size={100}
                className="absolute inset-0 -translate-x-1 text-textColor opacity-50"
              />
              <ShieldAlert
                size={100}
                className="absolute inset-0 translate-x-1 text-textColor opacity-50"
              />
              <ShieldAlert size={100} className="relative " />
            </div>

            <motion.h3
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="mt-8 text-2xl font-black uppercase tracking-tighter"
            >
              {t('BioScanner.threatDetected')}
            </motion.h3>
            <TextComponent
              fontSize={10}
              fontWeight={400}
              color={colors.textColor}
              className="mt-2 uppercase"
            >
              {t('BioScanner.neuralSignatureMismatch')}
            </TextComponent>
            <ButtonComponent
              onClick={() => setStatus('idle')}
              className="mt-8 rounded-full border border-maroon px-6 py-2 transition-colors hover:bg-maroon hover:bg-opacity-10"
              title={t('BioScanner.reInitializeSystem')}
              color={colors.whiteColor}
              borderColor={colors.borderColor}
            />
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success-ui"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 flex flex-col items-center text-primaryColor"
          >
            <ShieldCheck size={100} />
            <TextComponent
              fontSize={20}
              fontWeight={700}
              color={colors.primaryColor}
              className="mt-8"
            >
              {t('BioScanner.identityVerified')}
            </TextComponent>

            <ButtonComponent
              onClick={() => setStatus('idle')}
              className="mt-4 uppercase tracking-widest "
              title={t('BioScanner.logout')}
              color={colors.whiteColor}
              borderColor={colors.borderColor}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BioScanner;
