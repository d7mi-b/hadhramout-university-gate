const { Router } = require('express');
const archive = require('../controllers/archive');

const router = Router();

router.get('/advertisements', archive.archiveAdvertisements);
router.get('/news', archive.archiveNews);
router.get('/calanders', archive.archiveCalanders);
router.get('/grievances', archive.archiveGrievances);
router.get('/schedule', archive.archiveSchedules);
router.get('/singleSchedule', archive.archiveSingleSchedule);
router.get('/suggestions', archive.archiveSuggestions);
router.get('/transactions', archive.archiveTransactions);
router.get('/walletCharge', archive.archiveWalletcharges);

module.exports = router;