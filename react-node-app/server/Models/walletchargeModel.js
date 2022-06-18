const mongoose = require('mongoose');
const { Schema } = mongoose;


const walletChargeSchema = new Schema(
    {
        student_No:{type: Number} ,
        student_name: {type: String},
        check_No: {type: Number},
        amount:{type:Number},
        date: {type:String}
    },
    {
        timestamps: true
    }
)

const walletCharge = mongoose.model("WalletCharge",walletChargeSchema)
module.exports = walletCharge;