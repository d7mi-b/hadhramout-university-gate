const express = require('express');
const calanderController = require("../controllers/calanderController")


const router = express.Router();

router.get('/last',calanderController.get_last)
router.post('/',calanderController.add_cal)
router.patch('/:id',calanderController.add_details)
router.get('/:year',calanderController.get_cal)
router.patch('/deleteDet/:id',calanderController.deleteDet)


module.exports= router;