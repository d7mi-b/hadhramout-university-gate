const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.get('/regCir', pdfController.regCirt);
router.get('/degreeSt', pdfController.degreeSt);
router.get('/grievancyPDF', pdfController.grievancyPDF);

module.exports = router;
