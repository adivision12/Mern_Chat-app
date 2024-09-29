import React, { useEffect, useRef } from 'react'
import Message from './Message'
import GetMessage from '../../Context/GetMessage';
import Loading from '../../Components/Loading.jsx'
import io from 'socket.io-client';
import useGetSocketMessage from '../../Context/useGetSocketMessage.jsx';
import { useSocketContext } from '../../Context/SocketContext.jsx';
import userConversation from '../../stateManage/userConversation.js';
import sound from '../../assets/sound.mp4';
export default function Messages() {
  const {messages,loading}=GetMessage();
  const { selectedConversation } = userConversation();
  const { socket,noti,setNoti } = useSocketContext();
  // console.log('socket=',socket)
  useGetSocketMessage();
  // console.log("message",messages);
  // console.log("msgLength",messages.length);
  
  // console.log("loading",loading)
  const lastmsg=useRef();
  useEffect(()=>{
    setTimeout(()=>{
      if(lastmsg.current){
        lastmsg.current.scrollIntoView({behavior:"smooth"});
      }
    },100)
  },[messages])
  
var selectedChat;

useEffect(()=>{
  selectedChat=selectedConversation;
  if (socket && socket.connected) {
    socket.on("rec-message", (newMessage) => {
    
      if ( selectedChat._id===newMessage.senderId) {
        console.log('selected')
        setNoti([...noti])
      }else{
        console.log('not selected user')
        const notification=new Audio(sound);
        notification.play();
        if(noti && noti.map((n)=>{
          if(n.senderId===newMessage.senderId) noti.pop(n.senderId)
        }))
        setNoti([...noti, newMessage])
      }

    })
  }
},[selectedConversation,selectedChat])
  return (<div className={` overflow-y-auto h-[65%]`}>
    {loading?(<Loading></Loading>):( messages.length>0 && messages.map((message)=>{
     return <div ref={lastmsg} key={message._id} > <Message key={message._id} message={message}/></div>
    }))}
     <div className='p-4 '>
      { !loading && !messages.length>0 && <div><p className='text-center bg-slate-600 rounded-md '>Say Hii </p></div> }
      

    </div>
    </div>
   
    
  
  
    )
}
