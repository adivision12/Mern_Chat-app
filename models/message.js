const User =require( "./users.js");

const mongoose=require("mongoose");

const msgSchema= mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    senderName:{
        type:String,
        required:true
    },
    
},
{
    timestamps:true
},
);

const Message=mongoose.model("Message",msgSchema);

module.exports=Message;