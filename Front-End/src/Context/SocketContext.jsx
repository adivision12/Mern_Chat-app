import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import userConversation from '../stateManage/userConversation.js';
import { useAuth } from "./AuthProvider.jsx";
import useGetSocketMessage from "./useGetSocketMessage.jsx";

 const SocketContext=createContext();

 export const useSocketContext=()=>{
    return useContext(SocketContext);
 }
export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState();
    const [authUser,setAuthUser]=useAuth();

const [onlineUsers,setOnlineUsers]=useState([])
const {selectedConversation}=userConversation();
const [noti,setNoti]=useState([]);
const [isSideBar,setIsSidebar]=useState(true);
const [searchUser,setSearchUser]=useState([]);
const [newMessageAvl,setNewMessageAvl]=useState();
console.log(authUser);
        useEffect(()=>{

            if(authUser?._id){
                const socket=io("https://mern-chat-app-4-s043.onrender.com",{
                    query:{
                        userId:authUser._id,
                    }
                })
                setSocket(socket);
                
            
            socket.on("getOnline",(users)=>{
                    setOnlineUsers(users)
                   })
                   return ()=>socket.close();
                }else{
                    if(socket){
                        socket.close();
                        setSocket(null)
                    }
                }
        },[authUser])
    

    return(
        <SocketContext.Provider value={{socket,onlineUsers,noti,setNoti,isSideBar,setIsSidebar,searchUser,setSearchUser,newMessageAvl,setNewMessageAvl}}>
            {children}
        </SocketContext.Provider>
    )
};