const express = require('express');
const newsController = require('../controllers/newsController')

const router = express.Router();

router.get('/', newsController.news_index);
router.get('/:id', newsController.single_news);
router.post('/add-new', newsController.addNews);
router.delete('/delete/:id',newsController.deleteNews)

module.exports = router;