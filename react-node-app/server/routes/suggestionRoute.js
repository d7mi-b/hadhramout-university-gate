const express = require('express');
const suggestionsController = require('../controllers/suggestionsController');

const router = express.Router();

router.post('/create', suggestionsController.suggestionsPost);
router.get('/get-all', suggestionsController.suggestionsGet);

module.exports = router;