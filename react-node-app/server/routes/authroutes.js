const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();


router.get('/',authController.login_get);
router.post('/studentLogin',authController.login_post_student);
router.post('/employeeLogin',authController.login_post_employee);
router.get('/registerS',authController.registerStudent);
router.get('/registerE',authController.registerEmployee);
router.patch('/updateWallet', authController.update_wallte);
router.get('/updateUser', authController.update_User);
router.patch('/updateUserState', authController.update_state);


module.exports = router;