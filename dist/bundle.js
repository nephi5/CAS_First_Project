(function () {
'use strict';

/*
 GetNotes(orderBy, filterBy)
 AddNote(note)
 UpdateNote(note)
 GetNoteById(id)
 * */

class RemindersStorageService {
    constructor() {
        this.reminders = JSON.parse(localStorage.getItem('reminders'));
    }

    getReminders(orderBy, filterBy) {
        return this.reminders;
    }

    addReminder(title, notes, priority, dueDate) {
        let reminder = new Reminder(title, notes, priority, dueDate);
        this.reminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    updateReminder(reminder) {

    }

    getReminderById(id) {

    }
}


class Reminder {
    constructor(title, notes, priority, dueDate) {
        this.id = this.generateUUID();
        this.title = title;
        this.notes = notes;
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

function initializeRemindersStorageService$1 () {
    return new RemindersStorageService();
}

let ReminderStorageService = initializeRemindersStorageService$1();

class ReminderOverviewController {
    constructor() {
        ReminderStorageService.addReminder('Success', 'Become very successful', 3, '01-08-2018');
        ReminderStorageService.addReminder('Success', 'Become very successful', 1, '08-08-2018');
        this.overviewEl = $('.reminders-overview');
        this.reminders = ReminderStorageService.getReminders();
        this.template = Handlebars.templates['reminder-list'];
        this.renderUI();
    }

    renderUI() {
        this.overviewEl.append(this.template({reminders: this.reminders}));
    }
}

function initReminderController$1() {
    return new ReminderOverviewController();
}

class FilterPanelController {
    constructor() {
        this.renderUI();
        this.sortedBy = '';
    }

    renderUI() {
        let template = Handlebars.templates['filter-panel'];
        $('.filter-panel').append(template);
    }

    toggleFinished() {
        $('.finished-filter .btn').toggleClass('btn-active');
    }

    setFilterBy(filterBy) {
        if (this.sortedBy !== filterBy) {
            this.sortedBy = filterBy;
            $('.filter-panel .first-button-group .btn').removeClass('btn-active');
            $(`.filter-panel .btn[filter-option="${filterBy}"]`).addClass('btn-active');
            console.log(`filtering by: ${filterBy}`);
        }
    }
}

function initFilterPanelController$1() {
    return new FilterPanelController();
}

class MainController {
    constructor() {
        this.registerListener();
    }

    switchStyles(style) {
        console.log(`Switching styles to: ${style}`);
    }

    registerListener() {
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }
}

function initMainController$1 () {
    return new MainController();
}

window.FPCtrl = initFilterPanelController$1();
window.MCtrl = initMainController$1();
window.ROCtrl = initReminderController$1();

}());
