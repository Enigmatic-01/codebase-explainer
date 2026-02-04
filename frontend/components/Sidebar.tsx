import React from 'react';
import { ChatSession } from '../types';

interface Props {
  chats: ChatSession[];
  activeChatId: string | null;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;

  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;

  setActiveChatId: (id: string) => void;
  setIsModalOpen: (v: boolean) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

const Sidebar: React.FC<Props> = ({
  chats,
  activeChatId,
  isOpen,
  setIsOpen,
  isDarkMode,
  setIsDarkMode,
  setActiveChatId,
  setIsModalOpen,
  setChats,
}) => {
  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
  };

  return (
    <aside
  className={`w-72 bg-white dark:bg-gray-900 border-r flex flex-col
  ${isOpen ? 'block' : 'hidden md:flex'}`}
>
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-600 dark:text-brand-400">
          RepoTalk
        </h1>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          ✕
        </button>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium"
        >
          New Analyzer
        </button>
      </div>

      {/* Chat list */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`p-3 rounded-lg cursor-pointer ${
              activeChatId === chat.id
                ? 'bg-brand-100 dark:bg-brand-900/30'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {chat.title}
          </div>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="p-4 border-t dark:border-gray-800">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
