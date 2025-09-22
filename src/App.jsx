import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <HeroUIProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </HeroUIProvider>
  );
}

export default App;