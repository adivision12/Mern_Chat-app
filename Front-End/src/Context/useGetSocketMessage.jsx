import React, { useEffect, useState } from 'react'
import { useSocketContext } from './SocketContext'
import userConversation from '../stateManage/userConversation.js';
import sound from '../../src/assets/sound.mp4';

export default function useGetSocketMessage() {
    const { socket,noti,setNoti } = useSocketContext();
    const { messages, setMessages,selectedConversation } = userConversation();
  
    var seletedChat;
   
    useEffect(() => {
    
        seletedChat=selectedConversation;        
        socket.on("rec-message", (newMessage) => {
    //         const notification=new Audio(sound);
    // notification.play();
            if(seletedChat._id===newMessage.senderId){
            setMessages([...messages, newMessage]);
            
            }else{
                setMessages([...messages]);
                // const notification=new Audio(sound);
                // notification.play();

            }
        })
     
        
        return () => {socket.off('message');}
    }, [socket, messages, setMessages])

}
