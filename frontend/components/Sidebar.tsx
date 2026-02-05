import React from 'react';
import { ChatSession } from '../types';

interface Props {
  chats: ChatSession[];
  activeChatId: string | null;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;

  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;

  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
  setIsChatLoading: (v: boolean) => void;

  setActiveChatId: (id: string | null) => void;
  setIsModalOpen: (v: boolean) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

const BACK_API = import.meta.env.VITE_BACK_API;

const Sidebar: React.FC<Props> = ({
  isAuth,
  setIsAuth,
  chats,
  activeChatId,
  isOpen,
  setIsOpen,
  isDarkMode,
  setIsDarkMode,
  setActiveChatId,
  setIsModalOpen,
  setIsChatLoading,
  setChats,
}) => {
const handleSelectChat = async (chatId: string) => {
  try {
    setActiveChatId(chatId);      // ✅ open chat instantly
    setIsChatLoading(true);       // ✅ show loader

    const res = await fetch(`${BACK_API}/chats/${chatId}`, {
      credentials: 'include',
    });

    if (!res.ok) {
      if (res.status === 401) window.location.href = `${BACK_API}/auth/login`;
      return;
    }

    const chatWithMessages = await res.json();

    setChats(prev =>
      prev.map(c =>
        c.id === chatId
          ? { ...c, messages: chatWithMessages.messages }
          : c
      )
    );
  } catch (err) {
    console.error('Failed to fetch chat messages:', err);
  } finally {
    setIsChatLoading(false); // ✅ stop loading
  }
};


  const deleteChat = async (id: string) => {
    try {
      const res = await fetch(`${BACK_API}/chats/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.status === 401) {
        window.location.href = `${BACK_API}/auth/login`;
        return;
      }

      setChats(prev => prev.filter(c => c.id !== id));
      if (activeChatId === id) setActiveChatId(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleAuth = () => {
    if (isAuth) {
      fetch(`${BACK_API}/auth/logout`, { method: 'POST', credentials: 'include' }).finally(() => {
        setIsAuth(false);
        window.location.href = `${BACK_API}/auth/login`;
      });
    } else {
      window.location.href = `${BACK_API}/auth/login`;
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full w-72 z-50 transform
          bg-white dark:bg-gray-900 border-r dark:border-gray-800
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-brand-600 dark:text-brand-400">RepoTalk</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            ✕
          </button>
        </div>

       <div className="p-4">
  <button
    onClick={() => {
      if (!isAuth) {
        // User not logged in → redirect to login
        window.location.href = `${BACK_API}/auth/login`;
        return;
      }
      setIsModalOpen(true); // open modal only if logged in
    }}
    className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-brand-500 to-brand-700
               text-white font-semibold shadow-lg hover:shadow-xl
               hover:scale-105 transition-transform duration-200 ease-in-out
               focus:outline-none focus:ring-4 focus:ring-brand-300 border-amber-50 border-2"
  >
    New Analyzer
  </button>
</div>


        {/* Chat list */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer
                ${activeChatId === chat.id ? 'bg-brand-100 dark:bg-brand-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
            >
              <div onClick={() => handleSelectChat(chat.id)} className="flex-1 truncate">
                {chat.title}
              </div>
             <button
  onClick={e => {
    e.stopPropagation();
    deleteChat(chat.id);
  }}
  className="ml-2 text-red-500 hover:text-red-700 p-1 flex items-center gap-1"
  title="Delete chat"
>
  <span className="text-lg">🗑️</span>
</button>
            </div>
          ))}
        </nav>

      

        {/* Login / Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleAuth}
            className="w-full p-2 border-amber-50 border-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isAuth ? 'Logout' : 'Login'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
