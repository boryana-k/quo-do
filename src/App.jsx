import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import Welcome from './pages-temp/Welcome';
import Home from './pages-temp/Home';

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/welcome" exact element={<Welcome />}></Route>
      </Routes>
    </HeroUIProvider>
  )
}

export default App
