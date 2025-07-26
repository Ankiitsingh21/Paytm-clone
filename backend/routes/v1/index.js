const express = require("express");
const zod = require("zod");
const jwt= require("jsonwebtoken")
const User = require("../../repository/user");
const { JWT } = require("../../config/serverConfig");
const verifyToken = require("../../middleware/auth");
// const { verifyToken } = require("../../middleware/auth");
const router = express.Router();

const signupSchema = zod.object({
        username:zod.string(),
        password:zod.string(),
        firstName:zod.string(),
        lastName:zod.string()
})


router.post("/signUp",async(req,res)=>{
        const body = req.body;
        const {success} = signupSchema.safeParse(req.body);
        // console.log(success);
        if(!success){
                return res.status(401).json({
                        message:"Deatils are incorrect"
                })
        }
        const user = await User.findOne({
                username:body.username
        })
        // const iid=user._id;
        // console.log({iid});
        if(user){
                 return res.status(401).json({
                        message:"Email already exists or incorrect inputs"
                })
        }
        const db = await User.create(body);
        const token =jwt.sign({
                userId:db._id
        },JWT);
        
        return res.status(201).json({
                message:"Successfully signup",
                token:token
        })
});
// console.log("hii");
router.post("/signIn",async(req,res)=>{

        const username = req.body.username;
        const password = req.body.password;
        if(!req.body.username || !req.body.password){
                return res.status(401).json({
                        message:"username or password is missing"
                })
        }
        const user = await User.findOne({username});
        // console.log(user.password);
        if(!user){
                return res.status(401).json({
                        message:"user doesnot exist"
                })
        }
        if(user.password==password){
                const token = jwt.sign(
                        {userId:user._id},JWT);
                return res.status(201).json({
                        message:"suceesfully login",
                        token:token
                })
        }
        else{
                 return res.status(401).json({
                message:"Password is incorrect"
        })
        }
});
router.put("/update",verifyToken,async(req,res)=>{
        // const token =
        const user = await User.findByIdAndUpdate(req.userId,req.body, { new: true });
        // console.log(user);
        // console.log("hi");
        return res.status(201).json({
                message:"Updated Successfully",
                data:user
        })
});

module.exports = router;