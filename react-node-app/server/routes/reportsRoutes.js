const express = require('express');
const reportsController = require("../controllers/reportsController")

const router = express.Router();

router.get('/:id',reportsController.get_collection)





module.exports= router;