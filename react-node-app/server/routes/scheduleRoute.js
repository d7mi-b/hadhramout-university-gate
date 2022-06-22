const express = require('express');
const scheduleController = require('../controllers/scheduleController')

const router = express.Router();

router.patch('/:id', scheduleController.addSubjects);
router.post('/add', scheduleController.addSchedule);
router.get('/:department/:level/:semester/:group1/:group2',scheduleController.getSchedule);
router.patch('/:id1/:id2',scheduleController.deleteSubj);

module.exports = router;