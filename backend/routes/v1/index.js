const express = require("express");
const zod = require("zod");
const jwt= require("jsonwebtoken")
const User = require("../../repository/user");
const { JWT } = require("../../config/serverConfig");
const verifyToken = require("../../middleware/auth");
const Account = require("../../repository/account");
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
        // console.log(db._id);
        const amount = req.body.amount;
       const amm = await Account.create({ id: db._id, balance: amount });
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
        try {
                 // const token =
        const user = await User.findByIdAndUpdate(req.userId,req.body, { new: true });
        // console.log(user);
        // console.log("hi");
        return res.status(201).json({
                message:"Updated Successfully",
                data:user
        })
        } catch (error) {
               return res.status(401).json({
                message:"Failed to update",
                error:error
               }) 
        }
});

router.post("/transfer",verifyToken,async(req,res)=>{
        const fromAccountId = req.userId;
        const userName = req.body.username;
        const session = await mongoose.startSession();
        session.startTransaction();
        const toAccountId = await User.findOne({username:userName});
        // console.log(toAccountId, {userName});
        if (!toAccountId) {
                await session.abortTransaction();
        return res.status(404).json({ message: "Receiver not found" });
        }
        const amount = req.body.amount;
        const Balance = await checkBalance(fromAccountId);
        // console.log({Balance});
        if(amount>Balance){
                await session.abortTransaction();
                return res.status(201).json({
                        message:"The amount you entered is above the balance",
                        amount:amount
                })
        }
        // console.log(fromAccountId," ",toAccountId._id);
        //decrement from the sending user
        const decrement = await Decrement(fromAccountId,amount,session);
        const increment = await Increment(toAccountId._id,amount,session);
        if(decrement === true && increment === true){
                await session.commitTransaction();
                session.endSession();
                return res.status(201).json({
                message:"Money Transfered Succesfully",
                from:fromAccountId,
                to:toAccountId._id,
                amount:`₹${amount}`
        });
        }else {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({
                message: "Unable to update balance"
            });
        }
})


async function  checkBalance(id){
       const account = await Account.findOne({ id: id });
//        console.log(account);
       return account?.balance; 
}

async function Decrement(id, amount , session) {
    const account = await Account.findOneAndUpdate(
        { id },
        { $inc: { balance: -amount } },
        { new: true ,session}
    );
    return !!account; // true if account exists
}

async function Increment(id, amount , session) {
    const account = await Account.findOneAndUpdate(
        { id },
        { $inc: { balance: amount } },
        { new: true ,session}
    );
    return !!account;
}


module.exports = router;