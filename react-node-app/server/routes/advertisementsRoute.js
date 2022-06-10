const express = require('express')
const advertisementsController = require('../controllers/advertisementController');

const router = express.Router();

router.get('/', advertisementsController.advertisements_index);

module.exports = router;