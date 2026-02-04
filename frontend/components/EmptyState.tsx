import React from 'react';
const EmptyState: React.FC<{ setIsModalOpen: (v: boolean) => void }> = ({ setIsModalOpen }) => (
  <div className="flex-1 flex items-center justify-center">
    <button
  onClick={() => setIsModalOpen(true)}
  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow"
>
  Analyze a Repository
</button>

  </div>
);

export default EmptyState;
