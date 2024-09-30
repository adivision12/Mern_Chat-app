import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
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
    // console.log(data);
    toast.success("logout successfully");

    // localStorage.setItem("userInfo",JSON.stringify(data));
    localStorage.removeItem("userInfo")
    window.location.reload();

    // <Navigate to={"/login"}/>
    
    }
    
  return (<>
    <Toaster />
    <button onClick={handleSubmit}  className='bg-slate-950 text-2xl flex flex-col justify-end bottom-4'><a onClick={()=>{ navigate("/login")
}}><i  className="fa-solid fa-right-from-bracket"></i></a></button>
 </>
  )
}
