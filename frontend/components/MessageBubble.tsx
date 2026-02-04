import { Message } from '../types';
import React from 'react';
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
 <div
  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm
    ${message.role === 'user'
      ? 'bg-brand-600 text-white'
      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
    }`}
>
    <div className="max-w-[70%] px-4 py-3 rounded-2xl">
      {message.text}
    </div>
  </div>
);

export default MessageBubble;
