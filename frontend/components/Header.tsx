import { ChatSession } from '../types';
import React from 'react';
interface Props {
  activeChat?: ChatSession;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  setIsGraphOpen: (v: boolean) => void;
}

const Header: React.FC<Props> = ({
  activeChat,
  isSidebarOpen,
  setIsSidebarOpen,
  setIsGraphOpen
}) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            {activeChat ? (
              <div className="flex flex-col min-w-0">
                <h2 className="font-semibold truncate text-gray-900 dark:text-gray-100">{activeChat.title}</h2>
                <p className="text-xs text-gray-500 truncate">{activeChat.url} • {activeChat.branch}</p>
              </div>
            ) : (
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Welcome to RepoTalk</h2>
            )}
          </div>
          
          {activeChat && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsGraphOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a2 2 0 11-4 0V4zM4 13a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3zM14 13a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3z" />
                </svg>
                Visualize Repo
              </button>
            </div>
          )}
    </header>
  );
};

export default Header;
