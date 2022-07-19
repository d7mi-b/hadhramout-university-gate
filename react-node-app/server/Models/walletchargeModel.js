const mongoose = require('mongoose');
const { Schema } = mongoose;


const walletChargeSchema = new Schema(
    {
        studentNo:{type: Number} ,
        studentName: {type: String},
        checkNo: {type: Number},
        amount:{type: Number},
        type: {type: String},
        date: {type: Date}
    },
    {
        timestamps: true
    }
)

const walletCharge = mongoose.model("WalletCharge", walletChargeSchema);

module.exports = walletCharge;
