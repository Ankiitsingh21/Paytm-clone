const jwt = require("jsonwebtoken");
const { JWT } = require("../config/serverConfig");

const verifyToken = async(req,res,next)=>{
        // console.log("hii from auth layerrr");
        const token = req.body.token;
        // console.log(token);
        if(!token){
                return res.status(401).json({
                        message:"Token is missing"
                })
        }
        const response = jwt.verify(token,JWT);
        // console.log(response.userId);
         req.userId = response.userId;
        next();
}

module.exports = verifyToken;