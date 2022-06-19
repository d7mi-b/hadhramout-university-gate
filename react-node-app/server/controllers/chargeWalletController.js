const walletCharge= require('../Models/walletchargeModel')
const Student = require('../Models/studentModel')


// to add money to wallet

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


module.exports.updateWallet = async (req,res) => {
    const {username,amount} = req.body
    var pre = 0; 
    console.log(req.body)
    const student = Student;
    const i= student.find({username:username})
    .then(data => {
        return console.log(data[0].wallet)
    });
    console.log(pre)

    student.updateOne({username:username}, {$set: {wallet: pre+amount}})
        .then(result => res.status(200).json("wallet updated"))
        .catch(err => console.log(err));
} 