const express = require('express');
const router = express.Router();
const eventFilterController = require('../controllers/eventFilterController');


router.get('/events/filter', eventFilterController.filterEvents);

module.exports = router;
