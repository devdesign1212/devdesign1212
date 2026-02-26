import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextComponent from '@/components/Atoms/TextComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { showNotification } from '@/utils/notifications';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Maximize, QrCode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import jsQR from 'jsqr';

const QRScanner = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [scanState, setScanState] = useState<
    'idle' | 'scanning' | 'found' | 'invalid' | { data: string }
  >('idle');
  const [decodedData, setDecodedData] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const requestRef = useRef<number>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );

          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setDecodedData(code.data);
            setScanState({ data: code.data });
            stopCamera();
          } else {
            showNotification('error', t('QrScanner.NoQrFoundInImage'));
            setScanState('invalid');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const scanFrame = () => {
    if (
      scanState === 'scanning' &&
      videoRef.current &&
      videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
    ) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setDecodedData(code.data);
          setScanState({ data: code.data });
          stopCamera();
          return;
        }
      }
    }

    if (scanState === 'scanning') {
      requestRef.current = requestAnimationFrame(scanFrame);
    }
  };
  const initCamera = async () => {
    if (streamRef.current) {
      stopCamera();
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(showNotification('error', t('QrScanner.Error')), err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartScan = async () => {
    setScanState('scanning');
    setDecodedData('');
    await initCamera();
  };

  useEffect(() => {
    if (scanState === 'scanning') {
      requestRef.current = requestAnimationFrame(scanFrame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [scanState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (scanState === 'scanning') {
      timer = setTimeout(() => {
        setScanState('invalid');
        stopCamera();
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [scanState]);

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
          <div className="flex flex-col items-center">
            <motion.div
              key="viewport"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-primaryColor/20 group relative flex h-64 w-64 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2"
              onClick={handleStartScan}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  scanState === 'scanning' ? 'opacity-80' : 'opacity-0'
                }`}
              />
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
                  scanState === 'scanning' ? { opacity: 0 } : { opacity: 0.1 }
                }
                className="z-0 text-textColor"
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
            <div className="mt-20 flex flex-col items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />

              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <ButtonComponent
                onClick={() => fileInputRef.current?.click()}
                borderColor={colors.primaryColor}
                color={colors.textColor}
                title={t('QrScanner.Upload')}
                leftIcon={<QrCode size={14} />}
                variant="filled"
                className="uppercase tracking-widest transition-all "
              />
            </div>
          </div>
        ) : scanState === 'found' || typeof scanState === 'object' ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-primaryColor"
          >
            <div className="bg-primaryColor/10 mb-6 rounded-full border border-primaryColor p-6 shadow-[0_0_30px_rgba(0,133,133,0.3)]">
              <CheckCircle2 size={60} />
            </div>

            <TextComponent
              fontSize={22}
              fontWeight={900}
              color={colors.textColor}
              className="text-center uppercase tracking-widest"
            >
              {t('QrScanner.EncryptedKeyFound')}
            </TextComponent>

            <div className="mt-4 w-full max-w-xs overflow-hidden rounded-xl border border-borderColor bg-card p-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono break-all text-xs text-textColor"
              >
                {decodedData}
              </motion.p>
            </div>

            <div className="mt-8 flex gap-4">
              <ButtonComponent
                onClick={() => setScanState('idle')}
                borderColor={colors.primaryColor}
                color={colors.textColor}
                title={t('QrScanner.ScanAnother')}
                variant="outline"
              />

              {decodedData.startsWith('http') && (
                <ButtonComponent
                  onClick={() => window.open(decodedData, '_blank')}
                  borderColor={colors.primaryColor}
                  backgroundColor={colors.primaryColor}
                  color={colors.textColor}
                  title={t('QrScanner.OpenLink')}
                  variant="filled"
                />
              )}
            </div>
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
