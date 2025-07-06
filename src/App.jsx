import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <HeroUIProvider 
        navigate={navigate}
        className='min-h-screen flex'
      >
        <ToastProvider />
        
        <AppRoutes />
      </HeroUIProvider>
    </AuthProvider>
  )
}

export default App
