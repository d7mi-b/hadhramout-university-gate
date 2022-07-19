const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/addTransaction', transactionController.postTransaction);

module.exports = router;