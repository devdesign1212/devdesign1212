import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatLab from '@/Pages/Components/Chat';
import ButtonComponent from '../Atoms/ButtonComponent';
import { CircleQuestionMark } from 'lucide-react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { CloseIcon } from '@mantine/core';

const ChatWidget = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-[15%] right-5 ">
        <ButtonComponent
          leftIcon={<CircleQuestionMark color={colors.whiteColor} />}
          onClick={() => setIsOpen(prev => !prev)}
          variant="filled"
          width={38}
          color={colors.whiteColor}
          backgroundColor={colors.primaryColor}
          borderColor={colors.primaryColor}
          className="rounded-full shadow-lg"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-5 z-50 h-[480px] w-[250px] overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            <ChatLab />

            <div className="absolute right-2 top-2 ">
              <ButtonComponent
                rightIcon={<CloseIcon color={colors.whiteColor} size="20" />}
                onClick={() => setIsOpen(false)}
                variant="filled"
                width={35}
                color={colors.whiteColor}
                backgroundColor={colors.primaryColor}
                borderColor={colors.primaryColor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
