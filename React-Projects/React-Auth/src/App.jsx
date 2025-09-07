import { useState } from 'react'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (formData) => {
    // Add your authentication logic here
    console.log('Login attempted with:', formData);
    setIsLoggedIn(true);
  };
  console.log(import.meta.env.VITE_APPWRITE_ENDPOINT);
  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome! You are logged in!</h1>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App