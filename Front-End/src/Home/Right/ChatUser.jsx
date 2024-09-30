import React, { useState } from 'react';
import userConversation from "../../stateManage/userConversation.js"
import { useSocketContext } from '../../Context/SocketContext.jsx';
import { useNavigate } from 'react-router';
import { Button, Image,Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
export default function ChatUser() {
  const {selectedConversation,setSelectedConversation}=userConversation();
  const navigate=useNavigate();
const {socket,onlineUsers,noti,setNoti,isSideBar,setIsSidebar,newMessageAvl,setNewMessageAvl}=useSocketContext();
const isOnline=onlineUsers.includes(selectedConversation._id);
const [notiClass,setNotiClass]=useState('hidden')
const { isOpen, onOpen, onClose } = useDisclosure()

function handleNoti(){
console.log('show notification')
  if(notiClass=='hidden'){
    setNotiClass('visible')
  }else{
    setNotiClass('hidden')
  }
}
async function openNewMess(id) {
  if(id){
    let result = await fetch(`/user/new/${id}`, {
      method: "GET",
body: JSON.stringify(),
  })
   const data = await result.json();
  
setSelectedConversation(data.msgUser)
setNotiClass('hidden')
// setNoti([])
// console.log("updated=",)
  }
}

function backButton(user){
  if(newMessageAvl?.senderId===selectedConversation?._id){
    setNewMessageAvl();
  }
  setIsSidebar(true);
  // setSelectedUser(null);
      setSelectedConversation();
  // navigate("/user")
}
// console.log("sender=",selectedConversation)
  return (<>
    <div className="flex space-x-4  px-2 py-3 border bg-gray-700 cursor-pointer sticky">
    <i onClick={()=>{backButton(selectedConversation)}} className="fa-solid fa-arrow-left border rounded-lg hover:bg-slate-800 p-2 h-full"></i>
  <div className={`avatar ${isOnline?'online':'offline'}`}>
  <div onClick={onOpen} className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
  {selectedConversation.image?  <img src={selectedConversation.image} />: 
   <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />}
  </div>

</div>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalContent textAlign='center' w='300px' >
  {/* <ModalHeader fontSize='25px'>Profile</ModalHeader> */}
    <ModalHeader fontSize='30px' d="flex" justifyContent='center'>{selectedConversation.username}</ModalHeader>
    <ModalCloseButton />
    
   
    <ModalBody d="flex" justifyContent='center'  alignItems='center'  marginLeft='50px'>
{selectedConversation.image?<Image src={selectedConversation.image} boxSize='150px' borderRadius='full'/>
:<Image src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" boxSize='150px' borderRadius='full'/>
}
</ModalBody>
<Text fontSize={{base:'20px', md:'20px'}}
         >  Email: {selectedConversation.email} </Text>
    <ModalFooter>
     
     
    </ModalFooter>
  </ModalContent>
</Modal>
<div className="text-sm text-white">
    <h1 className='text-xl font-bold'>{selectedConversation?selectedConversation.username:"Unknown"}</h1>
<span> {` ${isOnline?'online':'offline'}`}</span>
</div>

<div className=' space-x-10  absolute right-10 top-6  '>
<i onClick={handleNoti} className={`fa-regular fa-bell hover:bg-slate-500  border p-2 rounded-full`}>
<div className='absolute top-0 right-0'> <NotificationBadge  count={noti.length} effect={Effect.SCALE}/>
</div>
</i>

{/* <i className="fa-solid fa-video hover:bg-slate-500 border p-2 rounded-full"></i> */}
{/* <i className="fa-solid fa-ellipsis-vertical hover:bg-slate-500 border p-2 rounded-full"></i> */}

</div>
    </div>
    <div  className={`${notiClass} text-center border bg-white p-1 rounded-lg  text-black` }>{noti.length?( noti.map((n)=><button key={n._id} onClick={()=>{openNewMess(n.senderId),setNoti(noti.filter((a)=>a.senderId!==n.senderId))
}}>New message received from <span className='font-bold'>{n.senderName}</span> &nbsp;</button>
    )):'No new messages'}</div>
    </>
  )
}
