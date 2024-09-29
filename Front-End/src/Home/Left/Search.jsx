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
    console.log(search);
   if(!search) return;
  //  const conversation=allUsers.find((user)=>{
  //   if(user.username.toLowerCase().includes(search.toLowerCase())){
  //     return user;
  //   }
    
  //  })
  //  console.log(conversation);
  //  if(conversation){
  //   setSelectedConversation(conversation);
  //  }else{
  //   alert("user not found")
  //  }
    setLoading(true);
    const token=authUser.token;
    let result = await fetch(`http://localhost:5173/user/search?q=${search}`, {
        method: "GET",
        Credentials:"include",
        headers:{
            authorization:`Bearer ${token}`,
        },
        
        body: JSON.stringify(),
    })
     const data = await result.json();
    console.log(data.allUsers);
    // const filterUser=data.allUsers;
    setSearchUser(data.allUsers);

    setLoading(false);
//  window.location.reload();
// console.log("filterUser",filterUser);
setSearch("");
if(data.allUsers.length==0){
  toast.error('User not found')
}

// return [searchUser]
      }
      // console.log("searchUser",searchUser)
         
          // console.log(searchUser)
  
    

  
  return (<form onSubmit={handleSubmit}>
    <div className='flex px-6 py-3'><input type="text" placeholder="Search" value={search} onChange={inputChange} className="input input-bordered w-full max-w-xs bg-slate-900 border-white text-white" />
    <button><i className="fa-solid fa-magnifying-glass mx-4 px-3 py-3  text-white border rounded-lg hover:bg-slate-700"></i></button>
    </div>
 
    </form>
  )
}
