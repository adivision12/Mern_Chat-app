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
                
                    // const token=Cookies.get("token");
                    const token=JSON.parse(localStorage.getItem("userInfo")).token;
                    // console.log(token);
                    // console.log("selectedConversation",selectedConversation._id)
                    // console.log("calling api")
                    let result = await fetch(`http://localhost:8080/msg/${selectedConversation._id}`, {
                        method: "GET",
                        Credentials:"include",
                        
                        headers:{
                            authorization:`Bearer ${token}`,
                        },
                
                body: JSON.stringify(),
                    })
                     const data = await result.json();
                    console.log(data);
         
                    setMessages(data.message);
                    // console.log("data",data);
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
