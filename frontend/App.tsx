import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message,RepoNode } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import EmptyState from './components/EmptyState';
import NewChatModal from './components/NewChatModal';
import RepoGraph from './components/RepoGraph';

const BACK_API = import.meta.env.VITE_BACK_API
const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [newRepoBranch, setNewRepoBranch] = useState('main');
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);
  const mockStructure: RepoNode = {
  name: 'repo',
  type: 'directory',
  children: [
    {
      name: 'src',
      type: 'directory',
      children: [
        { name: 'App.tsx', type: 'file' },
        { name: 'index.tsx', type: 'file' },
      ],
    },
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' },
  ],
};

const handleCreateChat =async  () => {
  if (!newRepoUrl) return;


 

  try {
    setIsLoading(true);

    const res = await fetch(`${BACK_API}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important for Flask session
      body: JSON.stringify({
        url: newRepoUrl,
        branch: newRepoBranch,
      }),
    });

    if (res.status === 401) {
      window.location.href = `${BACK_API}/auth/login`;
      return;
    }

    const chat = await res.json();

    const newChat: ChatSession = {
      id: chat.id,
      title: chat.title,
      url: chat.url,
      branch: newRepoBranch,
      messages: [],
      structure: mockStructure,
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);

    // reset + close modal
    setNewRepoUrl("");
    setNewRepoBranch("main");
    setIsModalOpen(false);

  } catch (err) {
    console.error("Create chat failed:", err);
  } finally {
    setIsLoading(false);
  }

};

useEffect(() => {
  const stored = localStorage.getItem('darkMode');
  if (stored) setIsDarkMode(stored === 'true');
}, []);

useEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode.toString());
}, [isDarkMode]);

const [authLoading, setAuthLoading] = useState(true);


useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${BACK_API}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        setIsAuth(false);
        setUserId(null);
      } else {
        const user = await res.json();
        setIsAuth(!!user?.id);
        setUserId(user?.id || null); // ✅ store userId
      }
    } catch {
      setIsAuth(false);
      setUserId(null);
    } finally {
      setAuthLoading(false);
    }
  };

  checkAuth();
}, []);


// Load chats after auth
useEffect(() => {
  if (!isAuth) return;

  const loadChats = async () => {
    try {
      const res = await fetch(`${BACK_API}/chats`, {
        credentials: "include",
      });

      if (res.status === 401) return;

      const data = await res.json();

    const chatsWithStructure = data.map((chat: ChatSession) => ({
      ...chat,
      structure: chat.structure ?? mockStructure,
    }));

    setChats(chatsWithStructure);
    } catch (err) {
      console.error("Failed to load chats:", err);
    }
  };

  loadChats();
}, [isAuth]);


// ✅ AFTER all hooks
if (authLoading) {
  return (
    <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  );
}

  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">

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
  isAuth={isAuth}
  setIsChatLoading={setIsChatLoading}
  setIsAuth={setIsAuth}
/>

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          activeChat={activeChat}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsGraphOpen={setIsGraphOpen}
        />
{activeChat && userId ? (
  <ChatArea
  chat={activeChat}
  setChats={setChats}
  isLoading={isLoading}
  setIsLoading={setIsLoading}
  userId={userId}
  isChatLoading={isChatLoading}
/>
) : (
  <EmptyState setIsModalOpen={setIsModalOpen} isAuth={isAuth} />

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
