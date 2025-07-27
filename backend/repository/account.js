const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
        id:{
               type: mongoose.Schema.Types.ObjectId,
               ref:'User',
               required:true
        },
        balance:{
                type:Number,
                required:true
        }
})

const Account = mongoose.model("Account",accountSchema);

module.exports=Account;