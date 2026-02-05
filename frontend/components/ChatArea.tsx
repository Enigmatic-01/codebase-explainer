import { ChatSession } from '../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import React, { useRef, useEffect } from 'react';
import { log } from 'node:console';

interface Props {
  chat: ChatSession;
  userId: string;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  isChatLoading: boolean;
}

const ChatArea: React.FC<Props> = ({ chat, setChats, isLoading, setIsLoading, userId,isChatLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [chat.messages]);


  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-950 text-gray-500">
        Select a chat to start a conversation
      </div>
    );
  }
  if (isChatLoading) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex items-center gap-3 text-gray-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        Loading messages...
      </div>
    </div>
  );
}
  const messages = chat.messages || [];

  return (
 <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-950">

      {/* Messages */}
      <div
    ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-2 sm:space-y-3"

    style={{ marginBottom: '1rem' }} // prevent last message from touching input
  >
        {messages.map((msg, index) => (
  <MessageBubble
    key={msg.msg_id || `${msg.role}-${index}-${msg.timestamp}`}
    message={msg}
  />
))}

      </div>

      {/* Input */}
       <div className="shrink-0">
    <ChatInput
      chatId={chat.id}
      setChats={setChats}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      userId={userId}
    />
  </div>
    </div>
  );
};

export default ChatArea;
