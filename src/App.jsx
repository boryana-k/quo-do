import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import {NextUIProvider} from "@nextui-org/react";
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {

  return (
    <NextUIProvider>
      {/* <ToDoForm /> */}

      <Routes>
        <Route path="/" exact element={<Home />}></Route>
      </Routes>

    </NextUIProvider>
  )
}

export default App
