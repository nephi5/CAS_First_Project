const express = require('express');
const router = express.Router();
const reminderCtrl = require('../controller/reminder.controller');

router.get('/', reminderCtrl.getAll);
router.get('/:id/', reminderCtrl.getById);
router.post('/', reminderCtrl.createReminder);
router.put('/:id/', reminderCtrl.updateReminder);

module.exports = router;