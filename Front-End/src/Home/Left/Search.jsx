import React, { useState ,useEffect} from 'react'
import { useAuth } from '../../Context/AuthProvider';

import { useSocketContext } from '../../Context/SocketContext.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function Search() {
  const [search,setSearch]=useState("");
  const {searchUser,setSearchUser}=useSocketContext();
  const [authUser,setAuthUser]=useAuth();
  const [loading,setLoading]=useState(false);



  function inputChange(event){
    setSearch(event.target.value);
    // console.log(search)
  }
  async function handleSubmit(event){
    event.preventDefault();
   if(!search) return;
  
    setLoading(true);
    const token=authUser.token;
    let result = await fetch(`/user/search?q=${search}`, {
        method: "GET",
        Credentials:"include",
        headers:{
            authorization:`Bearer ${token}`,
        },
        
        body: JSON.stringify(),
    })
     const data = await result.json();
    // const filterUser=data.allUsers;
    setSearchUser(data.allUsers);

    setLoading(false);
setSearch("");
if(data.allUsers.length==0){
  toast.error('User not found')
}

// return [searchUser]
      }
  
    

  
  return (<form onSubmit={handleSubmit}>
    <div className='flex px-6 py-3'><input type="text" placeholder="Search" value={search} onChange={inputChange} className="input input-bordered w-full max-w-xs bg-slate-900 border-white text-white" />
    <button><i className="fa-solid fa-magnifying-glass mx-4 px-3 py-3  text-white border rounded-lg hover:bg-slate-700"></i></button>
    </div>
 
    </form>
  )
}
