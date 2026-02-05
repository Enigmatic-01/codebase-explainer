interface NewChatModalProps {
  isOpen: boolean;
  isLoading: boolean;
  repoUrl: string;
  branch: string;
  onRepoUrlChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
}

const NewChatModal = ({
  isOpen,
  isLoading,
  repoUrl,
  branch,
  onRepoUrlChange,
  onBranchChange,
  onClose,
  onCreate,
}: NewChatModalProps) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border dark:border-gray-800 overflow-hidden">
    <div className="p-6 border-b dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Start New Analysis
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Connect your repository to begin chatting.
      </p>
    </div>
    <div className="p-6 space-y-4">
      <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
        Repository URL
      </label>
      <input
        type="url"
        placeholder="https://github.com/facebook/react"
        value={repoUrl}
        onChange={e => onRepoUrlChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
      />
      <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
        Branch
      </label>
      <input
        type="text"
        placeholder="main"
        value={branch}
        onChange={e => onBranchChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
      />
    </div>
    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-800 flex gap-3">
      <button
        onClick={onClose}
        className="flex-1 py-2.5 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={onCreate}
        disabled={!repoUrl || isLoading}
        className="flex-1 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Analyze'}
      </button>
    </div>
  </div>
</div>

  );
};

export default NewChatModal;
