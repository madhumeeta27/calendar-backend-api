const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// Basic CRUD operations
router.get('/', calendarController.listCalendars);
router.post('/', calendarController.createCalendar);
router.get('/:id', calendarController.getCalendar);
router.put('/:id', calendarController.updateCalendar);
router.delete('/:id', calendarController.deleteCalendar);

// NEW: My Calendars - combines user's own calendars + subscribed calendars
router.get('/my/:user_id', calendarController.getMyCalendars);

// NEW: Browse Calendars - shows all public calendars available for subscription
router.get('/browse/available', calendarController.browseCalendars);

// NEW: Create user's default calendars (My Calendar, Events, Holidays)
router.post('/default/:user_id', calendarController.createUserDefaultCalendars);

module.exports = router; 