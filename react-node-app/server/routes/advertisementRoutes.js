const express = require('express');
const adverController = require("../controllers/advertisementController")



const router = express.Router();

router.get("/advertisements",adverController.get_advertisement);
router.post("/create-ads",adverController.add_advertisement);
router.delete('/deleteads/:id',adverController.deleteAdv)

module.exports= router;