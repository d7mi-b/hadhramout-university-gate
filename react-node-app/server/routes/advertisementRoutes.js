const express = require('express');
const adverController = require("../controllers/advertisementController")



const router = express.Router();

router.get("/advertisements",adverController.get_advertisement);
router.post("/advertisements",adverController.add_advertisement);


module.exports= router;