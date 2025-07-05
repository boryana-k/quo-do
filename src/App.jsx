import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import {NextUIProvider} from "@nextui-org/react";
import Welcome from './Pages/Welcome';

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/welcome" exact element={<Welcome />}></Route>
      </Routes>
    </NextUIProvider>
  )
}

export default App
