import React, { useState } from 'react'
import User from './User'
import AllUsers from '../../Users/Users.jsx';
import Search from './Search.jsx';
import { useAuth } from '../../Context/AuthProvider.jsx';

export default function Users() {
  const [authUser,setAuthUser]=useAuth();
  // console.log("searchUser",search)
  const [allUsers,loading]=AllUsers();
 
  return (<div className='overflow-y-auto h-[82%]'> 
  {allUsers.map((user,idx)=>{
    if(authUser?._id!==user._id){
      return <User key={idx} user={user} />
    }
  })}
  </div>
  )
}
