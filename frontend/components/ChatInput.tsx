import { useState } from 'react';
import { Message } from '../types';
import React from 'react';
interface Props {
  chatId: string;
  setChats: React.Dispatch<any>;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const ChatInput: React.FC<Props> = ({ chatId, setChats, isLoading }) => {
  const [value, setValue] = useState('');

  return (
<form
  onSubmit={(e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setChats((prev: any) =>
      prev.map((c: any) =>
        c.id === chatId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: Date.now().toString(),
                  role: 'user',
                  text: value,
                  timestamp: Date.now(),
                },
              ],
            }
          : c
      )
    );

    setValue('');
  }}
  className="p-4 border-t"
>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full"
      />
    </form>
  );
};

export default ChatInput;
