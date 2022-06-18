const walletCharge= require('../Models/walletchargeModel')


// to add money to wallet

module.exports.addToWallet=async (req,res) => {
    const info = req.body;

    try{
        const add = await walletCharge.create(info);
        res.status(201).json(add)
    }
    catch(err) {
        console.log(err);
        res.status(400).json({information: "informations not created"})
    }
}