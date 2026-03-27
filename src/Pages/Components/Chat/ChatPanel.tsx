import { useEffect, useRef, useState } from 'react';
import { ChatPanelProps, FAQ } from '@/Common/interface';
import TextInputComponent from '@/components/Atoms/TextInputComponent';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { ArrowRightSvgIcon } from '@/assets/svg';
import { motion } from 'framer-motion';
import { isGreeting } from '@/utils/chatHelpers';
import { FAQS } from './faq';
import TextComponent from '@/components/Atoms/TextComponent';

const ChatPanel = ({
  messages,
  sendMessage,
  sendBotMessage,
  isTyping,
}: ChatPanelProps) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [input, setInput] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [visibleFAQs, setVisibleFAQs] = useState<FAQ[]>([]);
  const isBotRespondingRef = useRef(false);
  const [category, setCategory] = useState<FAQ['category']>('general');
  const getFAQsByCategory = (category: FAQ['category']) => {
    return FAQS.filter(faq => faq.category === category);
  };
  useEffect(() => {
    setVisibleFAQs(getFAQsByCategory(category).slice(0, 4));
  }, [category]);

  const findBestMatch = (input: string) => {
    const lowerInput = input.toLowerCase();

    return FAQS.find(faq =>
      faq.keywords.some(keyword => lowerInput.includes(keyword)),
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setShowFAQ(false);
    sendMessage(input);

    const isFirstMessage = messages.length === 0;
    if (isBotRespondingRef.current) return;

    isBotRespondingRef.current = true;

    setTimeout(() => {
      if (isGreeting(input) || isFirstMessage) {
        sendBotMessage(t('Chat.WelcomeToChat'));
        setTimeout(() => {
          setVisibleFAQs(getFAQsByCategory(category).slice(0, 4));
          setShowFAQ(true);
        }, 300);
      } else {
        const match = findBestMatch(input);

        if (match) {
          sendBotMessage(t(match.answerKey));
          setTimeout(() => {
            sendBotMessage(t('Chat.YouCanAlsoAsk'));
            setVisibleFAQs(getFAQsByCategory(category).slice(0, 4));
            setShowFAQ(true);
          }, 400);
        } else {
          sendBotMessage(t('Chat.ThanksForYourQuestion'));
          setShowFAQ(false);
        }
      }
      isBotRespondingRef.current = false;
    }, 600);

    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFAQClick = (faq: FAQ) => {
    if (isBotRespondingRef.current) return;

    isBotRespondingRef.current = true;
    sendMessage(t(faq.questionKey));

    setTimeout(() => {
      sendBotMessage(t(faq.answerKey));

      setTimeout(() => {
        sendBotMessage(t('Chat.YouCanAlsoAsk'));
        setVisibleFAQs(getFAQsByCategory(category).slice(0, 4));
        setShowFAQ(true);
        isBotRespondingRef.current = false;
      }, 400);
    }, 500);
  };

  return (
    <div className="flex h-full flex-col p-4">
      <motion.div
        layout
        className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden pr-1"
      >
        {messages.map(msg => {
          const isBot = msg.isBot;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex ${!isBot ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] break-words rounded-lg px-3 py-2 
                  ${msg.isPending ? 'opacity-60' : ''}
                  ${
                    isBot
                      ? 'bg-card '
                      : !isBot
                        ? 'bg-primaryColor'
                        : 'bg-borderColor'
                  }
                `}
              >
                <TextComponent
                  fontSize={12}
                  fontWeight={400}
                  color={
                    isBot
                      ? colors.textSecondary
                      : !isBot
                        ? colors.whiteColor
                        : colors.textColor
                  }
                >
                  {msg.text}
                </TextComponent>
              </div>
              {msg.isPending && (
                <div className="mt-1opacity-70">
                  <TextComponent
                    fontSize={10}
                    fontWeight={400}
                    color={colors.grayColor}
                  >
                    {t('Chat.Sending')}
                  </TextComponent>
                </div>
              )}
            </motion.div>
          );
        })}

        {isTyping && (
          <div className="text-[10px] italic text-gray-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 "
            >
              <TextComponent
                fontSize={10}
                fontWeight={400}
                color={colors.grayColor}
              >
                {t('Chat.BotTyping')}
              </TextComponent>
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                .
              </motion.span>

              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              >
                .
              </motion.span>

              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              >
                .
              </motion.span>
            </motion.div>
          </div>
        )}

        <div ref={bottomRef} />
      </motion.div>

      {showFAQ && (
        <>
          <div className="mb-2 grid grid-cols-2 gap-2">
            {['general', 'performance', 'integration', 'features'].map(cat => (
              <ButtonComponent
                title={cat}
                key={cat}
                onClick={() => setCategory(cat as FAQ['category'])}
                variant={category === cat ? 'filled' : 'outline'}
                fullWidth
                color={category === cat ? colors.whiteColor : colors.textColor}
                backgroundColor={colors.primaryColor}
                borderColor={colors.primaryColor}
                titleSize={9}
              />
            ))}
          </div>
          <div className="mb-2 grid grid-cols-2 gap-1">
            {visibleFAQs.map(faq => (
              <div
                key={faq.id}
                onClick={() => handleFAQClick(faq)}
                className="cursor-pointer rounded-xl border p-1 shadow-sm hover:shadow-md"
              >
                <TextComponent
                  fontSize={10}
                  fontWeight={400}
                  color={colors.textColor}
                >
                  {t(faq.questionKey)}
                </TextComponent>
              </div>
            ))}
          </div>
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bottom-0 mt-2 flex gap-2"
      >
        <TextInputComponent
          placeholder={t('Chat.TypeMessage')}
          value={input}
          onChange={e => setInput(e.target.value)}
          leftSection={<MessageCircle size={18} />}
          rightSection={
            <ButtonComponent
              rightIcon={<ArrowRightSvgIcon color={colors.whiteColor} />}
              onClick={handleSend}
              variant="filled"
              width={30}
              color={colors.whiteColor}
              backgroundColor={colors.primaryColor}
              borderColor={colors.primaryColor}
              disabled={!input.trim()}
            />
          }
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          required
          variant="default"
          borderColor={colors.primaryColor}
          backgroundColor={colors.primaryColor}
          color={colors.primaryColor}
          className="w-full"
        />
      </motion.div>
    </div>
  );
};

export default ChatPanel;
