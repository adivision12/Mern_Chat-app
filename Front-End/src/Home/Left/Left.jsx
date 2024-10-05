import React, { useState } from 'react';
import Search from './Search';
// import SearchUser from './Search';
import Users from './Users';
import Logout from './Logout';
import userConversation from '../../stateManage/userConversation.js';
import { useSocketContext } from '../../Context/SocketContext';
import SearchUsers from './SearchUsers';
import { useNavigate } from 'react-router';
import { Button, Image,Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../Context/AuthProvider';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
export default function Left({}) {
const navigate=useNavigate();
const { setSelectedConversation } = userConversation();

const [authUser,setAuthUser]=useAuth();
const { socket, noti, setNoti ,isSideBar,setIsSidebar,searchUser} = useSocketContext();

  const [notiClass, setNotiClass] = useState('hidden')
const { isOpen, onOpen, onClose } = useDisclosure()
  function handleUserSelect(user){
  setIsSidebar(false)
  }
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
      setIsSidebar(false)
      
    }
  }
  return (
    <div className={`w-screen-[40%]  border border-red-900 h-screen max-[500px]:h-[95vh] bg-black text-white flex max-[500px]:w-full $  ${isSideBar?'':'max-[500px]:hidden'} `}>
          <Logout/>
    <div>
   <div className='flex justify-between  '>
   <div className='text-3xl mx-10 my-2 font-bold'>
        Chats
        </div>
        <div className='min-[500px]:hidden'>
            <i onClick={handleNoti} className={`absolute top-2 fa-regular  fa-bell text-white right-[25%] hover:bg-slate-500  border p-2 rounded-full`}>
            <div className='absolute top-0 right-0'> <NotificationBadge  count={noti.length} effect={Effect.SCALE}/>
            </div>
            </i>
        </div>
        <div className={`${notiClass} absolute top-14 right-[17%] text-center border bg-white p-1 rounded-lg  text-black`}>{noti.length ? noti.map((n) => <button key={n._id} onClick={() => {
          openNewMess(n.senderId), setNoti(noti.filter((a) => a.senderId !== n.senderId))
        }}>New message received From <span className='font-bold'>{n.senderName}</span></button>
        ) : 'No new messages'}</div>
        <div onClick={onOpen} className='avatar min-[500px]:hidden'>
  <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
  {authUser.image?<img src={authUser.image} alt="" />
:<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
}
  </div>

</div>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalContent w='300px' textAlign='center'>
  {/* <ModalHeader fontSize='25px'>Profile</ModalHeader> */}
    <ModalHeader fontSize='30px' d="flex" justifyContent='center'>{authUser.username}</ModalHeader>
    <ModalCloseButton />
    
   
    <ModalBody d="flex" flexDir='column' justifyContent='center'  alignItems='center' marginLeft='40px' >
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
   </div>
    <Search/>
   
    <hr />
    <span onClick={handleUserSelect} >
      {searchUser?.length>0?<SearchUsers/>: <Users  />

}
    </span>
    </div>
  
    </div>
  )
}
