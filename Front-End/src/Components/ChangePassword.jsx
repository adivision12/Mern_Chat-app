import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';


export default function ChangePassword() {
    const [authUser,setAuthUser]=useAuth();

    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:"",
       
    });
    const inputHandler=(event)=>{
        let a=event.target.name;
        let b=event.target.value
        setFormData((currData)=>{
            return {...formData,[a]:b};
        })
        
    };
   
    
    async function handleSubmit(event){
        if(formData.email!=authUser.email){
            toast.error('enter valid email')
            return;
        }
        event.preventDefault();
        const response = await fetch("/user/password", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json();
       
        if(data.success){
            setFormData({
                email:"",
                password:"",
            });

            setTimeout(()=>{
                navigate("/");
            },100)
            toast.success("Password changed Successfully")
           
        }
        if(!data.success){
           toast.error(data.message)
        }
        
    }
  return (<>    
         <Toaster />
        <div className='flex justify-center items-center h-20'> <div className='text-blue-800 font-bold  text-4xl'>Chat App  <i className='fa-solid fa-fire-flame-curved'></i></div></div>
    <div className='h-[35rem] flex justify-center items-center bg-gray-300 max-[400px]:h-[50rem]'>
        <div className=' p-6 rounded-lg bg-white'>
        <div className='text-blue-800 font-bold text-xl'><h1>Messenger</h1></div>
        <div>Reset Your Password</div>
        <br />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
    
            <label htmlFor="username">Email : </label>
            <input type="text" placeholder='Enter Email' name='email' value={formData.email}  onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700  w-full rounded-md' />
            <br /><br />
                        <label htmlFor="password">Password : </label>
            <input type="text" placeholder='Enter password' name='password' value={formData.password} onChange={inputHandler} className='border-2 bg-gray-200 w-full rounded-md focus:outline-none focus:border-sky-700'  />
            <br />
           
            <button className='border border-black w-full bg-blue-900 rounded-lg  text-white'>Submit</button>
        </form>
        <p>Don't want to Change Password? <a onClick={()=>{ navigate("/")
}} className='text-blue-800 font-bold '>Home</a></p>
    </div>
    </div>
    </>

  )
}
