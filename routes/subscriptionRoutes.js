const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const subscriptionconn=require('../controllers/subscriptionconn')

router.post('/', subscriptionController.subscribe);
router.delete('/:id', subscriptionController.unsubscribe);
router.get('/', subscriptionController.listSubscriptions);
router.get('/events', subscriptionconn.listSubscribedEvents);
const subscribedCalendars = require('../controllers/listsubs');

router.get('/calendars', subscribedCalendars.listSubscribedCalendars);



module.exports = router; 