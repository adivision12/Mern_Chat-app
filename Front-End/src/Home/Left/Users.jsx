import React, { useEffect, useState } from 'react'
import User from './User'
import AllUsers from '../../Users/Users.jsx';
import Search from './Search.jsx';
import { useAuth } from '../../Context/AuthProvider.jsx';
import { useSocketContext } from '../../Context/SocketContext.jsx';

export default function Users() {
  const [authUser,setAuthUser]=useAuth();
  const [allUsers,loading]=AllUsers();
  const [chatUser,setChatUser]=useState();
  const { socket } = useSocketContext();
console.log('user of users')
  useEffect(()=>{
    if (socket && socket.connected) {
      socket.on("rec-message", (newMessage) => {
        setChatUser(newMessage.receiverId);
        console.log('chatUser',chatUser)
      }
    )}
  },[chatUser])
  return (<div className='overflow-y-auto h-[82%]'> 
   {chatUser && allUsers.map((user,idx)=>{
    if(chatUser===user._id){
      return <User key={idx} user={user} /> }
    })}
  {allUsers.map((user,idx)=>{
    if(authUser?._id!==user._id){
      if(chatUser && chatUser!=user._id){
        return <User key={idx} user={user} />
      }else{
        return <User key={idx} user={user} />
      }
    }
  })}
  </div>
  )
}
