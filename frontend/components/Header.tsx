import React from 'react';
import { ChatSession } from '../types';

interface Props {
activeChat?: ChatSession;
isSidebarOpen: boolean;
setIsSidebarOpen: (v: boolean) => void;

onVisualize: () => void;
}

const Header: React.FC<Props> = ({
activeChat,
isSidebarOpen,
setIsSidebarOpen,

onVisualize
}) => {
return ( <header className="h-16 flex items-center justify-between px-4 border-b
                   bg-white dark:bg-gray-900 dark:border-gray-800">
  <div className="flex items-center gap-3 min-w-0">
    {!isSidebarOpen && (
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        ☰
      </button>
    )}
    {activeChat ? (
      <div className="flex flex-col min-w-0">
        <h2 className="font-semibold truncate text-gray-900 dark:text-gray-100">
          {activeChat.title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {activeChat.url} • {activeChat.branch}
        </p>
      </div>
    ) : (
      <h2 className="font-semibold text-gray-900 dark:text-gray-100">
        Welcome to RepoTalk
      </h2>
    )}
  </div>
  {activeChat && (
<button
onClick={onVisualize}
className="
px-2 sm py-1.5
text-xs sm font-medium
rounded-lg
bg-brand-600 hover
text-white
transition-colors
whitespace-nowrap
shrink-0
border-2
border-amber-50
">
Visualize

  </button>
)}

</header>

);
};

export default Header;
