const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

router.get('/checkPrice', servicesController.checkPrice);

module.exports = router;
