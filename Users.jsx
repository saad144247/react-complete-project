import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state add ki gayi hai

  useEffect(() => {
    // API se data fetch karna
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load users. Please try again later.");
        setLoading(false);
      });
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-xl font-medium text-gray-600">Loading Team...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. Success State (Data Display)
  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Team Directory</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-2xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {user.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">@{user.username}</p>
            
            <div className="pt-4 border-t border-gray-50 dark:border-gray-700 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-2">📧</span>
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-2">🌍</span>
                <span className="truncate text-indigo-500">{user.website}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;