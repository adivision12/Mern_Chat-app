const {Server}=require("socket.io");
const http=require("http");
// var cors = require('cors');
const express=require("express");
const app=express();
// app.use(cors())
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"https://mern-chat-app-4-s043.onrender.com",
        methods:["GET","POST"],
        
    }
})



function getReceiverSocketId(receiverId){
    // console.log("users",users);
    return users[receiverId];
}

const users={};
io.on("connection",(socket)=>{

    console.log("new client connected",socket.id);
    const userId=socket.handshake.query.userId;
    console.log("userId",userId)
    if(userId){
        users[userId]=socket.id;
        // console.log(users);
       
    }
    
    io.emit('getOnline',Object.keys(users))
    socket.on("disconnect",()=>{
        console.log("client disconnected",socket.id)
        delete users[userId];
        io.emit("getOnline",Object.keys(users));
    })


    socket.on("typing",(room,sender)=>{
        
        // console.log(sender)
    io.to(users[room._id]).emit('typing',sender);
}) 
 socket.on("stop-typing",(room)=>{     
    // console.log("stop typing")
io.to(users[room._id]).emit('stop-typing');
})

})


module.exports= {app,io,server,getReceiverSocketId};