const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();


router.get('/',authController.login_get);
router.post('/',authController.login_post);
router.get('/registerS',authController.registerStudent);
router.get('/registerE',authController.registerEmployee);
router.patch('/updateWallet', authController.update_wallte);
router.get('/updateUser', authController.update_User);
router.patch('/updateUserState', authController.update_state);


module.exports = router;