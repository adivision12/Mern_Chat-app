import React, { useState } from 'react'

import userConversation from '../../stateManage/userConversation.js';
import { useSocketContext } from '../../Context/SocketContext.jsx';
import { useNavigate } from 'react-router';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { Button, Image,Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
export default function NoChat() {
    const { setSelectedConversation } = userConversation();
  const authUser = JSON.parse(localStorage.getItem("userInfo"));
  const {  noti, setNoti } = useSocketContext();
  const [notiClass, setNotiClass] = useState('hidden')
  const isNotification=noti.length>0;
  const bellClass=isNotification?"fa-solid":"fa-regular";
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate=useNavigate();
    function handleNoti() {
        console.log('show notification')
        if (notiClass == 'hidden') {
          setNotiClass('visible')
        } else {
          setNotiClass('hidden')
        }
      }
      async function openNewMess(id) {
        
        if (id) {
          let result = await fetch(`/user/new/${id}`, {
            method: "GET",
            body: JSON.stringify(),
          })
          const data = await result.json();
          setSelectedConversation(data.msgUser)
          setNotiClass('hidden')
        }
      }
  return (
         (<>
      <div className='h-20 bg-slate-800 border border-white '>

        <h1 className='font-bold text-3xl px-12 py-4'>Chat App &nbsp; <i className='fa-solid fa-fire-flame-curved max-[600px]:hidden'></i></h1>
   
        <i onClick={handleNoti} className={`absolute top-6 fa-regular  fa-bell text-white right-[15%] hover:bg-slate-500   p-2 rounded-full`}>
<div className='absolute top-0 right-0'>        <NotificationBadge  count={noti.length} effect={Effect.SCALE}/>
</div>
        </i>
       <div  className='absolute right-[6%] top-4'> <div className='avatar'>
  <div onClick={onOpen} className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
{authUser.image?<img src={authUser.image} alt="" />
:<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
}
  </div>
</div></div>


<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalContent textAlign='center' w='300px' >
  {/* <ModalHeader fontSize='25px'>Profile</ModalHeader> */}
    <ModalHeader fontSize='30px' d="flex" justifyContent='center'>{authUser.username}</ModalHeader>
    <ModalCloseButton />
    
   
    <ModalBody d="flex" justifyContent='center'  alignItems='center'  marginLeft='50px'>
  

    {authUser.image?<Image src={authUser.image} alt=""  boxSize='150px' borderRadius='full'/>
:<Image src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt=""  boxSize='150px' borderRadius='full'/>
}

</ModalBody>
<Text fontSize={{base:'20px', md:'20px'}}
         >  Email: {authUser.email} </Text>
    <ModalFooter>
     <Button onClick={()=>{navigate('/update')}}>Update</Button>
     
    </ModalFooter>
  </ModalContent>
</Modal>
        <div className={`${notiClass} absolute top-14 right-[17%] text-center border bg-white p-1 rounded-lg  text-black`}>{noti.length ? noti.map((n) => <button key={n._id} onClick={() => {
          openNewMess(n.senderId), setNoti(noti.filter((a) => a.senderId !== n.senderId))
        }}>New message received From <span className='font-bold'>{n.senderName}</span></button>
        ) : 'No new messages'}</div>
      </div>
      <div className='bg-slate-800 w-full text-white text-xl h-[80%] flex items-center justify-center'>Welcome @{authUser.username}


        <br />Select a chat to start Messaging
      </div>
    </>)
    // </div>
  )
}
