const express = require('express');
const newsController = require('../controllers/newsController')

const router = express.Router();

router.get('/news', newsController.news_index);
router.get('/news/:id', newsController.single_news);
router.post('/add-new', newsController.addNews);
router.delete('/delete/:id',newsController.deleteNews)

module.exports = router;