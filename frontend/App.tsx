import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message,RepoNode } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import EmptyState from './components/EmptyState';
import NewChatModal from './components/NewChatModal';
import RepoGraph from './components/RepoGraph';
import { buildTreeFromFlat } from "./treeBuilder";

const BACK_API = import.meta.env.VITE_BACK_API
const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTreeLoading, setIsTreeLoading] = useState(false);
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
const handleVisualize = async () => {
  if (!activeChatId) return;

  const chat = chats.find(c => c.id === activeChatId);
  if (!chat) return;

  if (chat.structure) {
    setIsGraphOpen(true);
    return;
  }

  const structure = await fetchTree(activeChatId);
  if (!structure) return;

  setChats(prev =>
    prev.map(c =>
      c.id === activeChatId
        ? { ...c, structure }
        : c
    )
  );

  setIsGraphOpen(true);
};



const fetchTree = async (chatId: string) => {
  try {
    const res = await fetch(`${BACK_API}/chats/${chatId}/tree`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Tree fetch failed");

    const data = await res.json();

    return buildTreeFromFlat(data.structure);
  } catch (err) {
    console.error("Tree error:", err);
    return undefined;
  }
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
      const normalizedChats: ChatSession[] = data.map((chat: any) => ({
  id: chat.id,
  title: chat.title,
  url: chat.url,
  branch: chat.branch ?? "main",
  messages: [],
}));

setChats(normalizedChats);

   


  
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
          
          onVisualize={handleVisualize}
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

  {isTreeLoading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    Loading repo graph...
  </div>
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
