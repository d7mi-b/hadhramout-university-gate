const express = require('express');
const walletChargeController = require("../controllers/chargeWalletController")



const router = express.Router();

router.patch("/update-wallet",walletChargeController.updateWallet);
router.post("/add-wallet",walletChargeController.addToWallet);
router.patch('/whitdrawWallet', walletChargeController.withdrawWallet);

module.exports= router;