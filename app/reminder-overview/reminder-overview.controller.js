import { default as ReminderService } from './../model/reminders.model';

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


