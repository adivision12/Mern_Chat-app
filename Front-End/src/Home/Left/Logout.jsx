import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function Logout() {

  const navigate=useNavigate();

    const handleSubmit=async()=>{
      const response = await fetch("/user/logout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    })
    
    const data = await response.json();
    toast.success("logout successfully");

    localStorage.removeItem("userInfo")
    window.location.reload();

  
    }
    
  return (<>
    <Toaster />
    <button onClick={handleSubmit}  className='bg-slate-900 text-2xl flex flex-col justify-end '><a onClick={()=>{ navigate("/login")
}}><i  className="fa-solid fa-right-from-bracket mb-10"></i></a></button>
 </>
  )
}
