import { useState } from 'react';
import { ChatMessage } from '@/Common/interface';

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      createdAt: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const sendBotMessage = async (text: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text,
        createdAt: Date.now(),
        isBot: true,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  return {
    messages,
    sendMessage,
    isTyping,
    clearChat,
    sendBotMessage,
  };
};

export default useChat;
