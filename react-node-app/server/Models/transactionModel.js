const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    username: {type: Number},
    date: {type: Date},
    service: {type: String},
    type: {type: String},
    price: {type: String}
});

const Transactions = mongoose.model('transactions', transactionSchema);
module.exports = Transactions;