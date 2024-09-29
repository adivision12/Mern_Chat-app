const Conversation  = require("../models/conversation.js");
const Message = require("../models/message.js");
const { getReceiverSocketId, io, getUserSocketId } = require("../socket/socket.js");

module.exports.sendMsg=async(req,res)=>{
    // console.log("id=",req.params.id)
    // console.log("user==",req.user)
   

    try {

        const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    const senderName=req.user.username;
    // console.log("req.user",req.user)
    if(!req.body){
        return res.json({message:"send valid message"})
    }
    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
    }
    const newMessage=new Message({
        senderId,
        receiverId,
        message,
        senderName
    })
//   await  newMessage.save().then((result)=>console.log("msg created successfully"))
    if (newMessage) {
        // await newMessage.save();
        conversation.messages.push(newMessage._id);        
        
    }
    await Promise.all([conversation.save(),newMessage.save()]);
    res.json({newMessage})
    const receiveSocketId=getReceiverSocketId(receiverId);
    // const senderSocketId=getReceiverSocketId(senderId);
    // console.log("receiveSocketId",receiveSocketId)
    if(receiveSocketId){
        io.in(receiveSocketId).emit("rec-message",newMessage)
    }
    // if(senderSocketId){
    //     io.in(senderSocketId).emit("send-message",newMessage)
    // }
    } catch (error) {
        console.log(error);
    }

}

module.exports.getMsg=async(req,res)=>{
    try {
        const {id:receiverId}=req.params;
    const senderId=req.user._id;

    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    }).populate("messages");
    // console.log(conversation)
    if(!conversation){
        return res.json({message:''});
    }
    const message=conversation.messages;
    // console.log(message)
    return res.json({message,success:true})
    } catch (error) {
        console.log(error);
    }
}

