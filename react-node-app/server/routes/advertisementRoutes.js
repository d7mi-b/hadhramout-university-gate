const express = require('express');
const adverController = require("../controllers/advertisementController")



const router = express.Router();

router.get("/", adverController.get_advertisement);
router.post("/create-ads", adverController.add_advs);
router.delete('/deleteads/:id', adverController.deleteAdv);

module.exports= router;