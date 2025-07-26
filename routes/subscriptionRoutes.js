const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.subscribe);
router.delete('/:id', subscriptionController.unsubscribe);
router.get('/', subscriptionController.listSubscriptions);

module.exports = router; 