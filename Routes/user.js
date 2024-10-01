const express=require("express");
const {signUp,login, logout, getUsers, getSearchUsers, getMsgUser, update, changePassword}=require("../Controller/users.js");
const { secureRoute } = require("../middleware.js/secureRoute.js");

const router=express.Router();

router.post("/signUp",signUp);
router.put("/update",update);
router.put('/password',changePassword);
router.post("/login",login);
router.post("/logout",logout);
router.get("/getUsers",getUsers);
router.get("/new/:id", getMsgUser);

router.get("/search",secureRoute,getSearchUsers);

module.exports=router;
// passport.authenticate("local",{failureRedirect:'/user/login'})