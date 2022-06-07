const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();


router.get('/',authController.login_get);
router.post('/',authController.login_post);
router.get('/registerS',authController.registerStudent);
router.get('/registerE',authController.registerEmployee);


module.exports = router;