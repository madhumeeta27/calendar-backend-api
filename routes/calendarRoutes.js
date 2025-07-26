const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.listCalendars);
router.post('/', calendarController.createCalendar);
router.get('/:id', calendarController.getCalendar);

module.exports = router; 