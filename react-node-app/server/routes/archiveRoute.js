const { Router } = require('express');
const archive = require('../controllers/archive');

const router = Router();

router.get('/employees', archive.archiveEmployee);
router.get('/advertisements', archive.archiveAdvertisements);
router.get('/news', archive.archiveNews);
router.get('/calanders', archive.archiveCalanders);
router.get('/grievances', archive.archiveGrievances);
router.get('/schedule', archive.archiveSchedules);
router.get('/singleSchedule', archive.archiveSingleSchedule);
router.get('/suggestions', archive.archiveSuggestions);
router.get('/transactions', archive.archiveTransactions);
router.get('/walletCharge', archive.archiveWalletcharges);
router.get('/printemployee', archive.printEmployee);
router.get('/printadvertisements', archive.printAdvertisements);
router.get('/printnews', archive.printNews);
router.get('/printcalanders', archive.printCalanders);
router.get('/printgrievances', archive.printGrievances);
router.get('/printschedule', archive.printSchedules);
router.get('/printsingleSchedule', archive.printSingleSchedule);
router.get('/printsuggestions', archive.printSuggestions);
router.get('/printtransactions', archive.printTransactions);
router.get('/printwalletCharge', archive.printWalletcharges);

module.exports = router;