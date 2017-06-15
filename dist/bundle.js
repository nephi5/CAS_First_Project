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
        let temp = JSON.parse(localStorage.getItem('reminders'));
        this.reminders = temp ? temp : [];
    }

    getReminders() {
        let orderBy = sessionStorage.orderBy;
        let filterByFinished = JSON.parse(sessionStorage.filterBy);
        let temp = JSON.parse(localStorage.getItem('reminders'));
        this.reminders = temp ? temp : [];
        if (this.reminders.length === 0) {
            return this.reminders;
        }

        if (filterByFinished) {
            this.reminders = this.reminders.filter((item) => !item.finished);
        }

        if (orderBy === 'finishDate') {
            this.reminders = this.reminders.sort((a, b) => {
                if (!NaN(a.finishDate))
                return a.finishDate - b.finishDate;
            });
        }

        if (orderBy === 'createdDate') {
            this.reminders = this.reminders.sort((a, b) => {
                return a.createdOn - b.createdOn;
            });
        }

        if (orderBy === 'importance') {
            this.reminders = this.reminders.sort((a, b) => {
                return b.priority - a.priority;
            });
        }
        console.log('reminderstorage: ', this.reminders);
        return this.reminders;
    }

    addReminder(title, notes, priority, dueDate) {
        let reminder = new Reminder(title, notes, priority, dueDate);
        this.reminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    updateReminder(reminder) {
        let listToBeUpdated = JSON.parse(localStorage.getItem('reminders'));
        for (let x = 0; x < listToBeUpdated.length; x++) {
            if (listToBeUpdated[x].id === reminder.id) {
                listToBeUpdated[x] = reminder;
            }
        }
        localStorage.setItem('reminders', JSON.stringify(listToBeUpdated));
    }

    updateFinishStatus(bool, id) {
        let reminder = this.getReminderById(id);
        reminder.finished = bool;
        reminder.finishDate = bool ? new Date(): 0;
        this.updateReminder(reminder);
    }

    getReminderById(id) {
        return this.reminders.filter((item) => {
            return item.id === id;
        })[0]
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
        this.finishDate = 0;
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

const ReminderStorageServiceClass = new RemindersStorageService();

class ReminderOverviewController {
    constructor() {
        // ReminderStorageService.addReminder('Hello World', 'This is my note', 3, '08-02-2017');
        // ReminderStorageService.addReminder('Another Title', 'Some more notetaking here', 4, '06-19-2017');
        this.overviewEl = $('.reminder-list');
        this.reminders = ReminderStorageServiceClass.getReminders();
        this.template = {};
        this.renderUI();
    }

    renderUI() {
        this.template = Handlebars.templates['reminder-list'];
        this.overviewEl.empty();
        console.log(this.reminders);
        this.overviewEl.append(this.template({reminders: this.reminders}));
        this.registerListener();
    }

    registerListener() {
        $('input[type="checkbox"]').on('click', (event) => {
            let bool = $(event.target).is(':checked');
            let id = $($(event.target)[0].attributes[0])[0].value;
            ReminderStorageServiceClass.updateFinishStatus(bool, id);
            this.reminders = ReminderStorageServiceClass.getReminders();
            this.renderUI();
        });
    }

    filterBy() {
        this.reminders = ReminderStorageServiceClass.getReminders();
        this.renderUI();
    }
}

function initReminderController$1() {
    return new ReminderOverviewController();
}

class FilterPanelController {
    constructor() {
        this.renderUI();
        sessionStorage.orderBy = sessionStorage.orderBy ? sessionStorage.orderBy: null;
        sessionStorage.filterBy = sessionStorage.filterBy ? sessionStorage.filterBy: true;

        if (!JSON.parse(sessionStorage.filterBy)) {
            $('.finished-filter .btn').addClass('btn-active');
        }

        $(`.filter-panel .btn[filter-option="${sessionStorage.orderBy}"]`).addClass('btn-active');

    }

    renderUI() {
        let template = Handlebars.templates['filter-panel'];
        $('.filter-panel').append(template);
    }

    toggleFinished() {
        sessionStorage.filterBy = !JSON.parse(sessionStorage.filterBy);
        console.log('sessionStorage.filterBy');
        console.log(sessionStorage.filterBy);
        $('.finished-filter .btn').toggleClass('btn-active');
        window.ROCtrl.filterBy();
    }

    setFilterBy(orderBy) {
        if (sessionStorage.orderBy !== orderBy) {
            sessionStorage.orderBy = orderBy;
            $('.filter-panel .first-button-group .btn').removeClass('btn-active');
            $(`.filter-panel .btn[filter-option="${orderBy}"]`).addClass('btn-active');
            window.ROCtrl.filterBy();
        }
    }
}

function initFilterPanelController$1() {
    return new FilterPanelController();
}

class MainController {
    constructor() {
        this.registerListener();
        if (sessionStorage.currentView === 'overview') {
            this.renderReminderOverviewView();
        }
    }

    switchStyles(style) {
        console.log(`Switching styles to: ${style}`);
    }

    registerListener() {
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }

    renderReminderOverviewView() {
        let mainViewEl = $('.main-view');
        let template = Handlebars.templates['reminder-overview-view'];
        mainViewEl.append(template);
    }
}

function initMainController$1 () {
    return new MainController();
}

if (!sessionStorage.currentView) {
    sessionStorage.setItem('currentView', 'overview');
}

window.MCtrl = initMainController$1();
window.FPCtrl = initFilterPanelController$1();
window.ROCtrl = initReminderController$1();

}());
