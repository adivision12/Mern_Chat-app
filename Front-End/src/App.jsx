import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import * as React from "react";
import Left from "./Home/Left/Left"
import Right from "./Home/Right/Right"
import {Routes,Route} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { BrowserRouter,useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "./Context/AuthProvider";

import { ChakraProvider } from '@chakra-ui/react'
import Update from "./Components/Update.jsx";
function App() {
const [authUser,setAuthUser]=useAuth();

  return (
    
     <ChakraProvider>

  <BrowserRouter>
  <Routes>
  <Route path="/update" element={!authUser?<Navigate to={"/login"}/>:<Update/>}/>

    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    
    <Route path="/" element={
      ( authUser )?<div className="flex">
      <Toaster/>

      <Left />
      <Right />
      
      
    </div>:  <Navigate to={"/login"}/>
            
    }/>
  </Routes>

  </BrowserRouter>
    </ChakraProvider>    
  )
}

export default App
