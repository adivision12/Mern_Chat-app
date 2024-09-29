import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import * as React from "react";
import Left from "./Home/Left/Left"
import Right from "./Home/Right/Right"
// import AllUsers from "./Users/users";
import {Routes,Route} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { BrowserRouter,useNavigate } from "react-router-dom";
// import { useAuth } from "./Context/AuthProvider";
import { useEffect,useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetMessage from "./Context/GetMessage";
// import {getMessage} from "./Context/getMessage";
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "./Context/AuthProvider";
import userConversation from './stateManage/userConversation';
import { useSocketContext } from './Context/SocketContext'
import useGetSocketMessage from './Context/useGetSocketMessage.jsx';
import NoChat from "./Home/Right/NoChat.jsx";

import { ChakraProvider } from '@chakra-ui/react'
import Update from "./Components/Update.jsx";
function App() {
  // const [isUser, setIsUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
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
      {/* <ToastContainer/> */}
      <Toaster/>
      {/* {selectedConversation?
      <Right/>:<Left /> 
      } */}
       {/* <div  onClick={handleUserSelect} className={`w-[40%] c-w border border-red-900 h-screen bg-black text-white flex  ${isSideBar?'':'max-[500px]:hidden'} `}> */}
      <Left />
      {/* </div> */}
            {/* <div className={` w-full  ${selectedUser?'':'hidden md:flex'}`}> */}
      <Right />
      {/* </div> */}
      {/* <NoChat/> */}
      
      
    </div>:  <Navigate to={"/login"}/>
            
    }/>
    {/* <Route path="/chat" element={<> <Right/>  </>}/>
    <Route path="/user" element={<Left/>}/> */}
  </Routes>

  </BrowserRouter>
    {/* <SignUp/> */}
    {/* <Login/> */}
    </ChakraProvider>    
  )
}

export default App
