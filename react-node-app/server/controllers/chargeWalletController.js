const walletCharge = require('../Models/walletchargeModel')
const Student = require('../Models/studentModel')


// to add money to wallet collection
module.exports.addToWallet= async (req,res) => {
    const info = req.body;

    try{
        const add = await walletCharge.create(info);
        res.status(201).json(add)
    }
    catch(err) {
        console.log(err);
        res.status(400).json({wallet: "wallet not added"})
    }
} 

// add money to student's wallet
module.exports.updateWallet = async (req, res) => {
    const {username, amount} = req.body;

    Student.updateOne({username:username}, {$inc: {wallet: amount}})
        .then(result => res.status(200).json("wallet updated"))
        .catch(err => console.log(err));
}

// withdraw money from student's wallet
module.exports.withdrawWallet = async (req, res) => {
    const {username, amount} = req.body;

    Student.updateOne({username:username}, {$inc: {wallet: -amount}})
        .then(result => res.status(200).json("wallet updated"))
        .catch(err => console.log(err));
}