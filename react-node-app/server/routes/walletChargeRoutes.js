const express = require('express');
const walletChargeController = require("../controllers/chargeWalletController")



const router = express.Router();

router.patch("/update-wallet",walletChargeController.updateWallet);
router.post("/add-wallet",walletChargeController.addToWallet);
//router.delete('/deleteads/:id',adverController.deleteAdv)

module.exports= router;