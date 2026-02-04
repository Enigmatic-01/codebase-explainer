import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import EmptyState from './components/EmptyState';
import NewChatModal from './components/NewChatModal';
import RepoGraph from './components/RepoGraph';

const STORAGE_KEY = 'repotalk_chats';

const App: React.FC = () => {
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [newRepoBranch, setNewRepoBranch] = useState('main');
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);
  const handleCreateChat = () => {
  if (!newRepoUrl) return;

  const newChat: ChatSession = {
    id: Date.now().toString(),
    title: 'New Repo',
    url: newRepoUrl,
    branch: newRepoBranch,
    messages: [
      {
        id: 'initial',
        role: 'model',
        text: `I've analyzed **${newRepoUrl}**. What would you like to know?`,
        timestamp: Date.now(),
      },
    ],
    structure: undefined, // or MOCK_STRUCTURE if you want
  };

  setChats(prev => [newChat, ...prev]);
  setActiveChatId(newChat.id);

  // reset + close
  setNewRepoUrl('');
  setNewRepoBranch('main');
  setIsModalOpen(false);
};
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode);
}, [isDarkMode]);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setChats(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar
  chats={chats}
  activeChatId={activeChatId}
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  setActiveChatId={setActiveChatId}
  setIsModalOpen={setIsModalOpen}
  setChats={setChats}
/>

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          activeChat={activeChat}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsGraphOpen={setIsGraphOpen}
        />

        {activeChat ? (
          <ChatArea
            chat={activeChat}
            setChats={setChats}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <EmptyState setIsModalOpen={setIsModalOpen} />
        )}
      </main>

      {isModalOpen && (
          <NewChatModal
    isOpen={isModalOpen}
    isLoading={isLoading}
    repoUrl={newRepoUrl}
    branch={newRepoBranch}
    onRepoUrlChange={setNewRepoUrl}
    onBranchChange={setNewRepoBranch}
    onCreate={handleCreateChat}
    onClose={() => setIsModalOpen(false)}
  />

      )}

      {isGraphOpen && activeChat?.structure && (
        <RepoGraph
          structure={activeChat.structure}
          onClose={() => setIsGraphOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
