const mongoose = require('mongoose');
const { Schema } = mongoose;


const walletChargeSchema = new Schema(
    {
        studentNo:{type: Number} ,
        studentName: {type: String},
        checkNo: {type: Number},
        amount:{type: Number},
        date: {type:String}
    },
    {
        timestamps: true
    }
)

const walletCharge = mongoose.model("WalletCharge",walletChargeSchema)
module.exports = walletCharge;