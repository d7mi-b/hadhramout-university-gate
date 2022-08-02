const express = require('express');
const grievanceController = require('../controllers/grievanceController');

const router = express.Router();

router.post('/create', grievanceController.grievancePost);
router.get('/get', grievanceController.grievanceGet);
router.get('/singleGrivence/:id', grievanceController.getSingleGrevince);
router.patch('/update-state', grievanceController.updateStateGrv);
router.get('/myGrievances', grievanceController.MyGrievance);

module.exports = router;