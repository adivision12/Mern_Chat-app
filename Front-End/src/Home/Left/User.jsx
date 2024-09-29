import React, { useEffect, useState } from "react";
import userConversation from '../../stateManage/userConversation.js';
import {  useSocketContext } from "../../Context/SocketContext.jsx";
import { useAuth } from "../../Context/AuthProvider.jsx";
// import sound from '../../assets/noti.mp4';

export default function User({user}){

  const {messages, setMessages,selectedConversation,setSelectedConversation}=userConversation();
  const isSeleted=selectedConversation?._id===user._id;
  // const [newMessageAvl,setNewMessageAvl]=useState();
  const [authUser,setAuthUser]=useAuth();
  const {socket,onlineUsers,noti, setNoti,newMessageAvl,setNewMessageAvl }=useSocketContext();
  const isOnline=onlineUsers.includes(user._id);

  console.log(socket)
  function handleClick(user){
      if(selectedConversation?._id===user._id){
        setNewMessageAvl();
      }
  }
  useEffect(() => {
    socket.on("rec-message", (newMessage) => {
      setNewMessageAvl(newMessage);
    })
    return () => {socket.off('message');}
}, [socket, messages])

  
  function selectUser(user){
    noti.pop(user._id);
    setSelectedConversation(user);
    // console.log(user)
   
  }
    return <div className={`hover:bg-slate-600 ${isSeleted? "bg-slate-700":""} ` } onClick={()=>{selectUser(user)}} >
     <div  onClick={()=>{handleClick(user)}} className="flex space-x-4 px-6 py-6  cursor-pointer">
  <div className={`avatar ${isOnline?'online':'offline'}`}>
  <div  className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
  {user.image?<img src={user.image} alt="" />
:<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
}
  </div>

</div>
<div className="text-sm">
    <h1>{user.username}</h1>
<span> {user.email}</span>
</div>
<div>
{newMessageAvl && newMessageAvl.receiverId===authUser._id && newMessageAvl.senderId===user._id && !isSeleted ?
<div className="text-white text-sm rounded-full bg-green-700 h-6 px-[6px] text-right ">+1</div>
:<></>
}
</div>
</div>
    </div>
}