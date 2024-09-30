import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';

export default function Login() {
    const [authUser,setAuthUser]=useAuth();
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    });
    const inputHandler=(event)=>{
        let a=event.target.name;
        let b=event.target.value
        setFormData((currData)=>{
            return {...formData,[a]:b};
        })
        
    };
    const handleSubmit=async(event)=>{
        event.preventDefault();
      
        let result = await fetch("/user/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await result.json();
        setAuthUser(data);
        if(data.success){
            localStorage.setItem("userInfo",JSON.stringify(data));

            setFormData({
                email:"",
                password:""
            });
            setTimeout(()=>{
                navigate("/");
            },100);
            toast.success("Login Successfully");
         
        }
        if(!data.success){
            toast.error(data.message)
        }
        
    }
    

  return (<>
    <Toaster />
    <div className='flex justify-center items-center h-20'> <div className='text-blue-800 font-bold  text-4xl'> <a className='none' href="https://mern-chat-app-4-s043.onrender.com/">Chat App </a> <i className='fa-solid fa-fire-flame-curved'></i></div></div>

    <div className='h-[35rem] flex justify-center items-center bg-gray-300 max-[400px]:h-[45rem]'>
        <div className=' p-6 rounded-lg bg-white '>
        <div className='text-blue-800 font-bold text-xl'><h1>Messenger</h1></div>
        <div>Login with your <span className='text-blue-800 font-bold '>Account</span></div>
        <br />
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input type="email" placeholder='Enter Email ' name='email' value={formData.email} onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700 w-full rounded-md' />
            <br /><br />
            <label htmlFor="email">Password : </label>
            <input type="text" placeholder='Enter Password' name='password' value={formData.password} onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700 w-full rounded-md'  />
            <br /> <br />
            <button className='border border-black w-full bg-blue-900 rounded-lg  text-white'>Login</button>
        </form>
        <p>Don't have  Account? <a onClick={()=>{ navigate("/signUp")
}} className='text-blue-800 font-bold '>Sign Up</a></p>
    
    </div>
    </div>
    </>
  )
}
