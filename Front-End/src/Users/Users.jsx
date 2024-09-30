import React from 'react'
import { useEffect,useState } from 'react'
import Cookies from "js-cookie";
import { useAuth } from '../Context/AuthProvider';
export default function AllUsers() {
    const [allUsers,setAllUsers]=useState([]);
    const [loading,setLoading]=useState();
    const [authUser,setAuthUser]=useAuth();

    if (JSON.parse(localStorage.getItem("userInfo")).token) {
    useEffect(()=>{
        setLoading(true);
         const getAllUsers=async()=>{
            const token=authUser.token;
            let result = await fetch("/user/getUsers", {
                method: "GET",
                Credentials:"include",
                headers:{
                    authorization:`Bearer ${token}`,
                },
                
                body: JSON.stringify(),
            })
             const data = await result.json();

            setAllUsers(data.allUsers);
            setLoading(false);
         
        }
        
                getAllUsers();
        
         
    },[])
    return [allUsers,loading];
}

 
// return (<></>)
}
