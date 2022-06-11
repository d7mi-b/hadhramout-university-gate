const express = require('express');
const newsController = require('../controllers/newsController')

const router = express.Router();

router.get('/news', newsController.news_index);
router.post('/create-new', newsController.addNews);

module.exports = router;