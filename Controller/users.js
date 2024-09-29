const User=require("../models/users.js");
const bcrypt=require("bcrypt");
// const generateToken=require("../config/JwtToken.js");
const jwt = require('jsonwebtoken');

const generateToken=(id,res)=>{
    const token= jwt.sign({id},"mysecret",{
        expiresIn:"30d",
    })
    res.cookie("jwt",token);
    return token;
}



module.exports.signUp=async(req,res)=>{
    const {email,username,password}=req.body.formData;
    const image=req.body.image;
    if(!email || !username || !password){
        return res.json({message:"fill all the details",success:false});
    }
    // if(password!=confirm_password){
    //     // return res.status(400).json({message:"Password do not match"});
    //     console.log("Password do not match");
    // }
    
    const user=await User.findOne({email});
    const user_name=await User.findOne({username});
    if(user ){
        return res.json({message:"Email already exist",success:false});
        // console.log("user already exist");
    }if(user_name){
        return res.json({message:"Username must be unique",success:false});
    }
    const newUser= new User({
        email,
        username,
        password,
        image
    })

    newUser.save().then(()=>console.log(newUser)).catch((err)=>console.log(err));
    if(newUser){
        res.json({
            _id:newUser._id,
            email:newUser.email,
            username:newUser.username,
            password:newUser.password,
            image:newUser.image,
            token:generateToken(newUser._id,res),
            message:"sign Up successfully",
            success:true
        })
    }
    // let registeredUser=await User.register(newUser,password);
    
    
}


module.exports.login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email  || !password){
        return res.json({message:"fill all the details",success:false});
    }
    
    const user=await User.findOne({email});
    if(!user){
        return res.json({message:"account does not exist"});63
    }
    // console.log(user);
    const isMatch= await bcrypt.compare(password,user.password)
    // console.log(isMatch)
    if(!user || !isMatch){
        return res.json({message:" password incorrect"});
        // console.log("account does not exist or password incorrect");
       
    }else{
        res.json({
            _id:user._id,
            email:user.email,
            username:user.username,
            password:user.password,
            image:user.image,
            token:generateToken(user._id,res),
            message:"Login successfully",
            success:true
        })
        console.log("Login successfully!");
      
    }
   
 
}

module.exports.logout=async(req,res)=>{
    console.log("logout successfully")
    try {
        // res.clearCookie("jwt");
        res.json({message:"User Logged out successfully",success:false})
    } catch (error) {
        res.json({message:"server Error"});
    }
}

module.exports.getUsers=async(req,res)=>{
    try {
        const allUsers=await User.find().select("-password");
        // console.log(allUsers);
        return res.json({allUsers});
    } catch (error) {
        console.log(error);
    }
}

module.exports.getSearchUsers=async(req,res)=>{
    try {
        const search=req.query.q;
        console.log(req.user)
        const allUsers=await User.find({$and:[{  username: { $regex:'.*'+search+'.*',$options: 'i'  }},{_id:{$ne:req.user._id}}]}).select("-password");
        res.json({allUsers});

    } catch (error) {
        console.log("err in search",error)
    }
}

module.exports.getMsgUser=async(req,res)=>{
    try {
        const {id}=req.params;
        // console.log(id)
        const msgUser=await User.findById(id);
        // console.log(msgUser);
        res.json({msgUser})
    } catch (error) {
        console.log('error in getting new mess though notifiaction',error)
    }
}

module.exports.update=async(req,res)=>{
    try {
      
        const user=await User.findOne({_id:req.body.id});
        const {username,password}=req.body.formData;
        const image=req.body.image;
        if(!username && !password && !image){
           return res.json({
                message:'Update SomeThing or Go Back',
                success:false
            })
        }
        const user_name=await User.findOne({username});
        if(user_name){
            return res.json({message:"Username must be unique",success:false});
        }
       if(username){
        user.username=username;
       }
       if(password){
        user.password=password;
       }
       if(image){
        user.image=image;
       }
       user.save().then((res)=>console.log('details updated successfully')).catch((e)=>console.log('error in updating'));

        console.log(user);
        
            res.json({
                _id:user._id,
                email:user.email,
                username:user.username,
                password:user.password,
                image:user.image,
                token:generateToken(user._id,res),
                message:"Updated successfully",
                success:true
            })
               // console.log(req.body);
        
    } catch (error) {
        console.log('error in update',error)
    }
}