import Header from './components/Header'
import Footer from './components/Footer'
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth_service';
import { useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  console.log("User status in App.jsx:", userStatus);

/*  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(!userData){
        navigate('/login');
      }
      setUser(userData);
    })
  },[navigate]);*/
  useEffect(() => {
    async function checkUser() {
      if(userStatus)
      {
        const user = await authService.getCurrentUser();
        if (user) {
            console.log('Logged in user:', user);
            // Handle logged in state
        } else {
            console.log('No user logged in');
            // Handle logged out state
        }
      }
    }
    checkUser();
}, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App