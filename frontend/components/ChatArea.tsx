import { ChatSession, Message } from '../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import React from 'react';
interface Props {
  chat: ChatSession;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const ChatArea: React.FC<Props> = ({
  chat,
  setChats,
  isLoading,
  setIsLoading
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
      <div className="flex-1 overflow-y-auto p-6">
        {chat.messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <ChatInput
        chatId={chat.id}
        setChats={setChats}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default ChatArea;
