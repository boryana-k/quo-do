import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {HeroUIProvider, ToastProvider} from "@heroui/react";
// import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        {/* <Route path="/welcome" exact element={<Welcome />}></Route> */}
      </Routes>
    </HeroUIProvider>
  )
}

export default App
