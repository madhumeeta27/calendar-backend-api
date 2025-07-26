const express = require('express');
const router = express.Router();
const eventDetailController = require('../controllers/eventDetailController');

router.post('/', eventDetailController.createEventDetail);
router.put('/:id', eventDetailController.updateEventDetail);

module.exports = router; 