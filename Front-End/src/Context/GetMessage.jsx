import React, { useEffect, useState } from 'react'
import userConversation from '../stateManage/userConversation.js';

export default function GetMessage() {
    const [loading,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation}=userConversation();

    useEffect(()=>{
        setLoading(true);
        const getMsgs=async()=>{
            
        if(selectedConversation && selectedConversation._id){
            try {
                
                    const token=JSON.parse(localStorage.getItem("userInfo")).token;
                    let result = await fetch(`/msg/${selectedConversation._id}`, {
                        method: "GET",
                        Credentials:"include",
                        
                        headers:{
                            authorization:`Bearer ${token}`,
                        },
                
                body: JSON.stringify(),
                    })
                     const data = await result.json();

         
                    setMessages(data.message);
                    setLoading(false);
                 
                }
            catch (error) {
                console.log(error)
            }
        }
        }
        getMsgs();
    },[selectedConversation,setMessages])
  return (
    {messages,loading}
  )
}
