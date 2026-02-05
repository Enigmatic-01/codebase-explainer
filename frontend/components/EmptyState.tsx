import React from 'react';

interface EmptyStateProps {
  setIsModalOpen: (v: boolean) => void;
  isAuth: boolean;
}
const BACK_API = import.meta.env.VITE_BACK_API;


const EmptyState: React.FC<EmptyStateProps> = ({ setIsModalOpen,isAuth }) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
    <div className="text-center space-y-4 sm:space-y-6 max-w-md">
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-linaer-to-tr from-brand-500 to-brand-700 text-white text-3xl sm:text-4xl shadow-lg">
        🗂️
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Ready to analyze a repository?
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl">
        Connect your repository and start exploring code with AI insights.
      </p>

      {/* CTA Button */}
      <button
  onClick={() => {
    if (!isAuth) {
      // redirect to login if user is not authenticated
      window.location.href = `${BACK_API}/auth/login`;
      return;
    }
    setIsModalOpen(true);
  }}
  className="mt-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-linear-to-r from-brand-500 to-brand-700
             text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105
             transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-brand-300
             border-2 border-amber-50"
>
  Analyze Repository
</button>

    </div>
  </div>
);

export default EmptyState;
