import React, { useEffect, useState } from 'react'
import userConversation from '../../stateManage/userConversation.js';
import toast, { Toaster } from 'react-hot-toast';
// import sound from '../../assets/noti.mp4'

import { useAuth } from '../../Context/AuthProvider.jsx';
import { useSocketContext } from '../../Context/SocketContext.jsx';
import Typing from '../../Components/Typing.jsx';
export default function Input() {

  const [loading,setLoading]=useState(false);
  const {messages,setMessages,selectedConversation}=userConversation();
  const [message,setMessage]=useState('');
  const [authUser,setAuthUser]=useAuth();
  const [typing,setTyping]=useState(false);
  const [isTyping,setIsTyping]=useState(false);
  const { socket } = useSocketContext();
  useEffect(()=>{
    socket.on('typing',(sender)=>{
      // console.log('typing user=',sender)
      // console.log("ss=",selectedConversation)
     if(selectedConversation._id===sender._id){
      setIsTyping(true)
     }else{
      setIsTyping(false)
     }
  })
  socket.on('stop-typing',()=>{
    // console.log("is stop Typing")
    setIsTyping(false)
})
  },[selectedConversation])

  const inputHandle=(event)=>{
    setMessage(event.target.value);
// console.log(event.target.value.length)
    if(!socket) return ;
    // setTyping(true)

      if(!typing){
      
        setTyping(true);
        // console.log(typing)
        socket.emit('typing',selectedConversation,authUser)
        // console.log(typing)
      }
    
    let lastTime=new Date().getTime();
    // console.log(lastTime)
    var timeLen=2000;
    setTimeout(()=>{
      var timeNow=new Date().getTime();
      // console.log(timeNow)
      var diff=timeNow-lastTime;
      if(diff>=timeLen ){
        // console.log(diff)
        socket.emit('stop-typing',selectedConversation)
        setTyping(false);
      }
    },timeLen)
    // console.log(lastTime)
    
  }
  async function handleSubmit(event){
    // const notification=new Audio(sound);
    // notification.play();
    event.preventDefault();
    // console.log(message);
    socket.on('stop-typing',()=>{
      // console.log("is stop Typing")
      setIsTyping(false)
  })
    setMessage("");
    if(message && selectedConversation ){
      setLoading(true)
      // const token=JSON.parse(localStorage.getItem("userInfo")).token;
      const token=authUser.token;
      let result = await fetch(`/msg/send/${selectedConversation._id}`, {
        method: "POST",
        body: JSON.stringify({message}),
        Credentials:"include",
           headers:{
                 authorization:`Bearer ${token}`,
                 'Content-Type': 'application/json'
             },
    })
    const data = await result.json();

    // console.log("data",data);
    // console.log("mess=",messages)
    setMessages([...messages,data.newMessage])
    setLoading(false);
    // console.log('mess sent')
   
    }
  }
  return (<>
        {/* <Toaster /> */}
        <div>{isTyping ? <div ><Typing/> </div>:<></>}</div>
      
{/* <div><Typing></Typing></div> */}
    <form onSubmit={handleSubmit}>
    
      <div className='flex  justify-center absolute bottom-0 w-[60%] ml-[5%] max-[500px]:w-[90%]'>
       
        <input type="text" name='message' value={message} onChange={inputHandle} placeholder="Write Something" className="input input-bordered   bg-slate-900 border-white text-white w-[100%]" />
       <button> <i  className="fa-solid fa-share mx-4 px-3 py-3  text-white border rounded-lg hover:bg-gray-600 text-xl"></i></button>
    </div>
    </form>
    </>
  )
}
