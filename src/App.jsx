import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import {NextUIProvider} from "@nextui-org/react";
import { supabase } from './createClient.js'
import { useEffect, useState } from 'react';

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
      </Routes>

    </NextUIProvider>
  )
}

export default App
