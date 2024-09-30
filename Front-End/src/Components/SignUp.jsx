import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import { useAuth } from '../Context/AuthProvider';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';
import { Progress } from '@chakra-ui/react';


export default function SignUp() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [progress,setProgress]=useState('hidden');

    const [formData,setFormData]=useState({
        email:"",
        username:"",
        password:"",
       
    });
    const [image,setImage]=useState();
    const [authUser,setAuthUser]=useAuth();
    const inputHandler=(event)=>{
        let a=event.target.name;
        let b=event.target.value
        setFormData((currData)=>{
            return {...formData,[a]:b};
        })
        
    };
   async function handleFile(event){
    setLoading(true)
        let img=event.target.files[0];

        // console.log(img)
        if(img){
            setProgress('block');
       }
        const form=new FormData();
        form.append('file',img);
        form.append('upload_preset','chat-app');
        form.append('cloud_name','dcgdg9ths');
        fetch('https://api.cloudinary.com/v1_1/dcgdg9ths/image/upload',{
            method: "post",
            body: form,
        })
        .then((res)=>res.json())
        .then((d)=>{
            // console.log(d.url)
            setImage(d.url);
            if(d.url){
                setProgress('hidden');
           }
            setLoading(false)
        })
        .catch((e)=>{
            console.log(e)
            setLoading(false)
        }) ;   
        // console.log("data",event.target.files[0]);
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        console.log(formData);
        // console.log(image)
        // 
        setFormData({
            email:"",
            username:"",
            password:"",
        });
        
        const response = await fetch("/user/signUp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({formData,image}),
        })
        
        const data = await response.json();
        setAuthUser(data);
      
        if(data.success){
            localStorage.setItem("userInfo",JSON.stringify(data));

            setTimeout(()=>{
                navigate("/");
            },100)
            toast.success("Sign up Successfully")
         
        }
        if(!data.success){
           toast.error(data.message)
        }
        
    }
  return (<>    
         <Toaster />
        <div className='flex justify-center items-center h-20'> <div className='text-blue-800 font-bold  text-4xl'>Chat App  <i className='fa-solid fa-fire-flame-curved'></i></div></div>
    <div className='h-[35rem] flex justify-center items-center bg-gray-300 max-[400px]:h-[45rem] '>
        <div className=' p-6 rounded-lg bg-white'>
        <div className='text-blue-800 font-bold text-xl'><h1>Messenger</h1></div>
        <div>Create a new <span className='text-blue-800 font-bold '>Account</span></div>
        <br />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor="email">Email <span className='text-red-700'>* </span> :</label>
            <input type="email" placeholder='Enter Email ' name='email' value={formData.email} onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700 w-full rounded-md' />
            <br /><br />
            <label htmlFor="username">Username <span className='text-red-700'>* </span>: </label>
            <input type="text" placeholder='Enter username' name='username' value={formData.username} onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700  w-full rounded-md' />
            <br /><br />
            <label htmlFor="image">Profile Picture : Optional</label>
            <input type="file" placeholder='Upload Profile Image' name='image' onChange={handleFile}  className='border-2 bg-gray-200  w-full rounded-md focus:outline-none focus:border-sky-700'  />
            <br />
            <div className={`${progress}`}>            <Progress size='xs' isIndeterminate/>
            </div> <br />
            <label htmlFor="password">Password <span className='text-red-700'>* </span>: </label>
            <input type="text" placeholder='Enter Password' name='password' value={formData.password} onChange={inputHandler} className='border-2 bg-gray-200  w-full rounded-md focus:outline-none focus:border-sky-700'  />
            <br /> <br />
           
           
            <button className='border border-black w-full bg-blue-900 rounded-lg  text-white'>Submit</button>
        </form>
        <p>Already have an Account? <a onClick={()=>{ navigate("/login")
}} className='text-blue-800 font-bold '>Login</a></p>
    </div>
    </div>
    </>

  )
}
