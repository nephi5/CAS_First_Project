const reminderStore = require('../services/reminders.store');
const ReminderCtrlObj = {
    createReminder: createReminder,
    getAll: getAll,
    updateReminder: updateReminder,
    getById: getById
}

function createReminder(req, res) {
    reminderStore.addReminder(req.body, function (err, reminder) {
        res.json(reminder);
    })
}

function getAll(req, res) {
    reminderStore.getAll(req.query, function (err, reminders) {
        res.json(reminders || {});
    })
}

function getById(req, res) {
    reminderStore.getById(req.params.id, function (err, reminder) {
        res.json(reminder);
    })
}

function updateReminder(req, res) {
    reminderStore.updateReminder(req.params.id, req.body, function (err, numReplaced) {
        res.json(numReplaced);
    })
}

module.exports = ReminderCtrlObj;