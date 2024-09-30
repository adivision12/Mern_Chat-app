const express=require("express");
// const app=express();
const signUp=require("./Controller/users.js");
const userRouter=require("./Routes/user.js");
const msgRouter=require("./Routes/message.js");
const mongoose=require("mongoose");
const User = require("./models/users.js");
var cookieParser = require('cookie-parser')
const path=require('path');
var cors = require('cors');
const { app,server } = require("./socket/socket.js");
app.use(cors());

if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
  }
  try {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'));
  } catch (error) {
    console.log('error in connecting to mongodb'+error);
  }

app.use(express.json());
app.use(cookieParser())
// app.get("/",(req,res)=>{
//     res.send("working");
// })


app.use("/user",userRouter);
app.use("/msg",msgRouter);
if(process.env.NODE_ENV==="production"){
  const dirPath=path.resolve();
    app.use(express.static(path.join(dirPath,'./Front-End/dist')));
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(dirPath,'Front-End','dist','index.html'));
    })
  }

server.listen(8080,()=>{
    console.log("Server is running on port 8080");
})


