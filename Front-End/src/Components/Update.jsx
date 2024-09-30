import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import { useAuth } from '../Context/AuthProvider';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';
import { Progress } from '@chakra-ui/react';


export default function Update() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState({
        username:"",
        password:"",
       
    });
    const [progress,setProgress]=useState('hidden');
    const [image,setImage]=useState();
    const [authUser,setAuthUser]=useAuth();
    const id=authUser._id;
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
        // console.log(formData);
        // console.log("image",image)
       
        
        const response = await fetch("/user/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,formData,image}),
        })
        
        const data = await response.json();
       
        if(data.success){
            setFormData({
                username:"",
                password:"",
            });
            setAuthUser(data);

            localStorage.setItem("userInfo",JSON.stringify(data));
            setTimeout(()=>{
                navigate("/");
            },100)
            toast.success("Updated Successfully")
           
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
        <div>Update Your Details</div>
        <br />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
    
            <label htmlFor="username">Username : </label>
            <input type="text" placeholder={authUser.username} name='username' value={formData.username}  onChange={inputHandler} className='border-2 bg-gray-200 focus:outline-none focus:border-sky-700  w-full rounded-md' />
            <br /><br />
            <label htmlFor="image">Profile Picture : </label>
            <input type="file" placeholder='Upload Profile Image' name='image' onChange={handleFile}  className='border-2 bg-gray-200  w-full rounded-md focus:outline-none focus:border-sky-700'  />
            <br />
            <div className={`${progress}`}>            <Progress size='xs' isIndeterminate/>
            </div>
            <br />
            <label htmlFor="password">Password : </label>
            <input type="text" placeholder={authUser.password} name='password' value={formData.password} onChange={inputHandler} className='border-2 bg-gray-200 w-full rounded-md focus:outline-none focus:border-sky-700'  />
            <br /> <br />
           
           
            <button className='border border-black w-full bg-blue-900 rounded-lg  text-white'>Submit</button>
        </form>
        <p>Don't want to update? <a onClick={()=>{ navigate("/")
}} className='text-blue-800 font-bold '>Home</a></p>
    </div>
    </div>
    </>

  )
}
