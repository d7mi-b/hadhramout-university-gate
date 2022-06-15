const express = require('express');
const degreeController = require('../controllers/degreeController');

const router = express.Router();

router.get('/', degreeController.degree_index);

module.exports = router;