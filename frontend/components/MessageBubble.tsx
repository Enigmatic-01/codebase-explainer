import { Message } from '../types';
import React from 'react';

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          relative max-w-[85%] sm:max-w-[70%] px-4 pt-3 pb-6 rounded-2xl
          text-sm sm:text-base wrap-break-word
          ${isUser
            ? 'bg-gray-100 dark:bg-gray-800  text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }
          shadow-sm transition-all duration-200
        `}
      >
        {/* Message text */}
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Timestamp */}
        <span
          className={`absolute text-xs ${
            isUser ? 'right-2 bottom-1 text-gray-200' : 'left-2 bottom-1 text-gray-500 dark:text-gray-400'
          }`}
        >
          
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
