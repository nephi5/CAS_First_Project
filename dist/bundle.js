(function () {
'use strict';

class Reminder {
    constructor(reminder, priority, dueDate) {
        this.id = this.generateUUID();
        this.reminder = reminder;
        this.priority = priority;
        this.dueDate = new Date(dueDate);
        this.createdOn = new Date();
        this.finished = false;
    }

    generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
}

function saveReminder (reminder) {
    let reminders = getReminders();
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function getReminders() {
    return JSON.parse(localStorage.getItem('reminders'));
}

function createReminder(note, priority, dueDate) {
    let reminder = new Reminder(note, priority, dueDate);
    return reminder;
}

var ReminderService = { saveReminder, getReminders, createReminder };

let tempRemindersArr = [];
let tempReminder = ReminderService.createReminder ('Become very successful', 3, '08/08/2018');
tempRemindersArr.push(tempReminder);

if (!localStorage.getItem('reminders')) {
    localStorage.setItem('reminders', JSON.stringify(tempRemindersArr));
    // Are we going to cooperate
}
var overviewEl = $('.reminders-overview');


let template = Handlebars.templates['reminder-list'];
overviewEl.append(template(tempReminder));

}());
