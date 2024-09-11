import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import {NextUIProvider} from "@nextui-org/react";
import { supabase } from './createClient.js'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(false)
  
  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])
  
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" exact element={token ? <Navigate to="/dashboard"/> : <SignUp />}></Route>
        <Route path="/login" exact element={token ? <Navigate to="/dashboard"/> : <Login setToken={setToken}/>}></Route>
        <Route path="/signup" exact element={token ? <Navigate to="/dashboard"/> : <SignUp />}></Route>
        <Route path="/dashboard" exact element={token ? <Home token={token}/> : <Navigate to="/login"/>}></Route>
      </Routes>

    </NextUIProvider>
  )
}

export default App
