const express=require("express");
const { sendMsg, getMsg, getMsgUser } = require("../Controller/message");
const { secureRoute } = require("../middleware.js/secureRoute");
const router=express.Router();


router.post("/send/:id",secureRoute ,sendMsg);
router.get("/:id",secureRoute ,getMsg);


module.exports=router;