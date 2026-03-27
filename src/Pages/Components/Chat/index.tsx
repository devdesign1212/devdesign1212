import useRealtime from './useChat';
import ChatPanel from './ChatPanel';
import ButtonComponent from '@/components/Atoms/ButtonComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { RefreshCcw } from 'lucide-react';

const ChatLab = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const { messages, sendMessage, isTyping, clearChat, sendBotMessage } =
    useRealtime();

  return (
    <div className="flex h-full flex-col rounded-xl border">
      <div className="flex justify-between border-b p-2">
        <div className="flex gap-[2px]">
          <ButtonComponent
            leftIcon={<RefreshCcw color={colors.primaryColor} size={15} />}
            onClick={clearChat}
            variant="outline"
            width={35}
            color={colors.primaryColor}
            borderColor={colors.primaryColor}
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-y-scroll">
        <div className="flex-1">
          <ChatPanel
            messages={messages}
            sendMessage={sendMessage}
            sendBotMessage={sendBotMessage}
            isTyping={isTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatLab;
