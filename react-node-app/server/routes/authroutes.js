const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();


router.get('/',authController.login_get);
router.post('/studentLogin',authController.login_post_student);
router.post('/employeeLogin',authController.login_post_employee);
router.post('/adminLogin',authController.login_post_admin);
router.get('/registerS',authController.registerStudent);
router.get('/registerE',authController.registerEmployee);
router.get('/registerA',authController.registerAdmin);
router.patch('/updateWallet', authController.update_wallte);
router.get('/updateUser', authController.update_User);
router.patch('/updateUserState', authController.update_state);
router.patch('/deleteNotification', authController.deleteNotification);
router.patch('/stateNotification', authController.stateNotification);
router.get('/getStudents/:department', authController.getStudents);
router.patch('/addNotification', authController.addNotification);
router.patch('/changePassword', authController.changePassword);
router.get('/checkOldPassword', authController.checkOldPassword);
router.post('/sendForgetPass', authController.sendEmail);

 


module.exports = router;