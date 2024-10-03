import React from 'react'
import userConversation from '../../stateManage/userConversation.js';
export default function ({message}) {
  const authUser=JSON.parse(localStorage.getItem("userInfo"))
  const { selectedConversation } = userConversation();
  // console.log(authUser);
  const itsMe=authUser._id===message.senderId;
  const chatName=itsMe?"chat-end":"chat.start";
  const chatColor=itsMe?"bg-blue-400":"";
  const createdAt=new Date(message.createdAt);
  const formatTime=createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })

  
  return (

    <div>
     { <div className={`chat ${chatName}`}>
        <div className={`chat-bubble chat-bubble-accent mx-2 ${chatColor}`}>{message.message}</div>
        <br />
        <div className='text-sm mx-2'> {formatTime}</div>
        </div>
     }
       
    </div>
  )
}
