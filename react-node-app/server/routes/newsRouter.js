const express = require('express');
const newsController = require('../controllers/newsController')

const router = express.Router();

router.get('/', newsController.news_index);
router.get('/:id', newsController.single_news);

module.exports = router;