const mongoose=require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcryptjs');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
      type:String,
      required:true
  },
  password:{
    type:String,
    required:true
},image:{
  type:String,
  default:"http://res.cloudinary.com/dcgdg9ths/image/upload/v1727279042/extvunndcmxrcn1lrmga.jpg"
}

},{timestamps:true}
)

// UserSchema.pre('save',async function (next) {
//   if(!this.isModified){
//     next();
//   }
//   const salt=await bcrypt.genSalt(10);
//   this.password=await bcrypt.hash(this.password,salt);
// })

// UserSchema.plugin(passportLocalMongoose);

const User= mongoose.model("User",UserSchema);

module.exports=User;