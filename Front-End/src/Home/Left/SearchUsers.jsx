import React, { useState } from 'react'
import User from './User'
import AllUsers from '../../Users/Users.jsx';
import Search from './Search.jsx';
import { useAuth } from '../../Context/AuthProvider.jsx';
import { useSocketContext } from '../../Context/SocketContext.jsx';

export default function SearchUsers() {
  const [authUser,setAuthUser]=useAuth();
  // console.log("searchUser",search)
  const {searchUser,setSearchUser}=useSocketContext();
//   console.log("filterUser",searchUser);
 function ClearSearch(){
    // console.log('backed')
    setSearchUser([]);
    window.location.reload();
 }
  return (<div className='overflow-y-auto h-[82%]'> 
  {searchUser.map((user,idx)=>{
   
      return <User key={idx} user={user} />
    
  })}
  <button className=' bg-gray-700 hover:bg-gray-500 rounded-lg p-2 m-4' onClick={ClearSearch}>Back To Home Page</button>
  </div>
  )
}
