const express = require('express');
const grievanceController = require('../controllers/grievanceController');

const router = express.Router();

router.post('/create', grievanceController.grievancePost);

module.exports = router;