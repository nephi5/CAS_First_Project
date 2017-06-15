(function () {
'use strict';

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
        return this.reminders;
    }

    addReminder(reminder) {
        let tempReminders = JSON.parse(localStorage.reminders);
        tempReminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(tempReminders));
    }

    createReminder() {
        return new Reminder();
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
    constructor() {
        this.id = this.generateUUID();
        this.title = '';
        this.notes = '';
        this.priority = 0;
        this.dueDate = null;
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

class ReminderDetailController {
    constructor(option, id) {
        this.option = option;
        this.id = id ? id : null;
        this.mainView = $('.main-view');
        this.template = Handlebars.templates['reminder-detail'];

        if (this.option === 'create') {
            this.reminder = ReminderStorageServiceClass.createReminder();
        } else {
            this.reminder = ReminderStorageServiceClass.getReminderById(this.id);
        }

        this.renderUI();
        this.createPrioritySymbols();
        this.passValue();
        this.registerListeners();
    }

    saveChanges() {
        if (this.option === 'create') {
            ReminderStorageServiceClass.addReminder(this.reminder);
            window.MCtrl.renderReminderOverviewView();
        } else {
            ReminderStorageServiceClass.updateReminder(this.reminder);
            window.MCtrl.renderReminderOverviewView();
        }
    }

    cancelChanges() {
        window.MCtrl.renderReminderOverviewView();
    }

    renderUI() {
        this.mainView.append(this.template({reminder: this.reminder}));
    }

    registerListeners() {
        $('.reminder-detail .input-title').on('keyup', (event) => {
            this.reminder.title = event.target.value;
        });

        $('.reminder-detail .input-note').on('keyup', (event) => {
            this.reminder.notes = event.target.value;
        });

        $('.reminder-detail .input-date').on('change', (event) => {
            this.reminder.dueDate = new Date(event.target.value);
        });
    }

    passValue() {
        $('.reminder-detail .input-title')[0].value = this.reminder.title;
        $('.reminder-detail .input-note')[0].value = this.reminder.notes;
        $('.reminder-detail .input-date').value = this.reminder.dueDate === null ? '': moment(this.reminder.dueDate).format('YYYY-MM-DD');
    }

    createPrioritySymbols() {

        let ratingContainerEl = $('.reminder-detail .priority-symbol-container');
        for (let x = 0; x < 5; x++) {
            ratingContainerEl.append($(`<span class="priority-symbol" star-num="${x}">&#9733</span>`));
        }

        function addClassToStars (num, className) {
            for (let x = 0; x <= num; x++) {
                $(`[star-num="${x}"]`).addClass(className);
            }
        }

        $('.priority-symbol').on('mouseover', function () {
            let starNum = $(this).attr('star-num');
            addClassToStars(starNum, 'active');
        });

        $('.priority-symbol-container').on('click', (event) => {
            $('.priority-symbol').removeClass('perm');
            let starNum = event.target.attributes[1].value;
            this.reminder.priority = (parseInt(starNum) + 1);
            addClassToStars(starNum, 'perm');
        });

        $('.priority-symbol').on('mouseleave', function () {
            $('.priority-symbol').removeClass('active');
        });
    }
}

function initReminderDetailController(option, id) {
    return new ReminderDetailController(option, id);
}

class ReminderOverviewController {
    constructor() {
        this.overviewEl = $('.reminder-list');
        this.reminders = ReminderStorageServiceClass.getReminders();
        this.template = {};
        this.renderUI();
    }

    renderUI() {
        this.template = Handlebars.templates['reminder-list'];
        this.overviewEl.empty();
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

        $('.list-container .btn-edit').on('click', (event) => {
            let id = $($(event.target)[0].attributes[0])[0].value;
            window.MCtrl.renderReminderDetailViewById(id);
        });
    }

    filterBy() {
        this.reminders = ReminderStorageServiceClass.getReminders();
        this.renderUI();
    }
}

function initReminderController() {
    return new ReminderOverviewController();
}

class FilterPanelController {
    constructor() {
        this.renderUI();
        sessionStorage.orderBy = sessionStorage.orderBy ? sessionStorage.orderBy: null;
        sessionStorage.filterBy = sessionStorage.filterBy ? sessionStorage.filterBy: true;

    }

    renderUI() {
        let template = Handlebars.templates['filter-panel'];
        $('.filter-panel').append(template);
        if (!JSON.parse(sessionStorage.filterBy)) {
            $('.finished-filter .btn').addClass('btn-active');
        }
        $(`.filter-panel .btn[filter-option="${sessionStorage.orderBy}"]`).addClass('btn-active');
    }

    toggleFinished() {
        sessionStorage.filterBy = !JSON.parse(sessionStorage.filterBy);
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

function initFilterPanelController() {
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
        mainViewEl.empty();
        mainViewEl.append(template);
        window.ROCtrl = initReminderController();
        window.FPCtrl = initFilterPanelController();
    }

    renderReminderDetailView() {
        $('.main-view').empty();
        window.RDCtrl = initReminderDetailController('create');

    }

    renderReminderDetailViewById(id) {
        $('.main-view').empty();
        window.RDCtrl = initReminderDetailController('edit', id);
    }
}

function initMainController$1 () {
    return new MainController();
}

if (!sessionStorage.currentView) {
    sessionStorage.setItem('currentView', 'overview');
}

window.MCtrl = initMainController$1();

}());
