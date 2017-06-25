(function () {
'use strict';

class ReminderStorageUtil {
    constructor() {
        this.createQueryString();
    }

    createQueryString() {
        let orderBy = sessionStorage.orderBy;
        let filterBy;
        try {
            JSON.parse(sessionStorage.filterBy);
        } catch (e) {
            sessionStorage.filterBy = true;
        }

        filterBy = sessionStorage.filterBy;

        let queryString = `?filterBy=${filterBy}`;
        if (orderBy !== 'null') {
            queryString += `&orderBy=${orderBy}`;
        }

        return queryString;
    }

    updateReminder(reminder) {
        return fetch(`/reminders/${reminder._id}`, {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(reminder)
        })
    }

    getById(id) {
        return fetch(`/reminders/${id}`).then(function (response) {
            return response.json();
        })
    }

    getAll() {
        return fetch(`/reminders${this.createQueryString()}`).then(function (response) {
            return response.json();
        })
    }

    createReminder(reminder) {
        return fetch('/reminders', {
            method: 'post',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(reminder)
        }).then(function (response) {
            return response.json();
        });
    }
}

var ReminderStorageUtil$1 = new ReminderStorageUtil();

class RemindersStorageService {
    constructor() {
        let temp = JSON.parse(localStorage.getItem('reminders'));
        this.reminders = temp ? temp : [];
    }

    getReminders() {
        return ReminderStorageUtil$1
            .getAll()
    }

    addReminder(reminder) {
        return ReminderStorageUtil$1.createReminder(reminder);
    }

    createReminder() {
        return new Reminder();
    }

    updateReminder(reminder) {
        return ReminderStorageUtil$1.updateReminder(reminder);
    }

    updateFinishStatus(bool, id, reminders) {
        let reminder = this.getReminderById(reminders, id);
        reminder.finished = bool;
        reminder.finishDate = bool ? new Date(): 0;
        return this.updateReminder(reminder);
    }

    getReminderById(reminders, id) {
        return reminders.filter(item => item._id === id)[0];
    }
}


class Reminder {
    constructor() {
        this.title = '';
        this.notes = '';
        this.priority = 0;
        this.dueDate = null;
        this.createdOn = new Date().getTime();
        this.finished = false;
        this.finishDate = 0;
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
            this.renderUI();
        } else {
            this.reminder = ReminderStorageUtil$1
                .getById(id)
                .then((response) => {
                    this.reminder = response;
                    this.renderUI();
                });
        }
    }

    saveChanges() {
        if (this.option === 'create') {
            ReminderStorageServiceClass.addReminder(this.reminder).then(function () {
                window.MCtrl.renderReminderOverviewView();
            });

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
        this.createPrioritySymbols();
        this.passValue();
        this.registerListeners();
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
        let dueDate = this.reminder.dueDate === null ? '': moment(this.reminder.dueDate).format('YYYY-MM-DD');
        $('.reminder-detail .input-title')[0].value = this.reminder.title;
        $('.reminder-detail .input-note')[0].value = this.reminder.notes;
        $('.reminder-detail .input-date').val(dueDate);
        this.addClassToStars(this.reminder.priority - 1, 'perm');
    }

    createPrioritySymbols() {
        let classThis = this;
        let ratingContainerEl = $('.reminder-detail .priority-symbol-container');
        for (let x = 0; x < 5; x++) {
            ratingContainerEl.append($(`<span class="priority-symbol" star-num="${x}">&#9733</span>`));
        }

        $('.priority-symbol').on('mouseover', function () {
            let starNum = $(this).attr('star-num');
            classThis.addClassToStars(starNum, 'active');
        });

        $('.priority-symbol-container').on('click', (event) => {
            $('.priority-symbol').removeClass('perm');
            let starNum = event.target.attributes[1].value;
            this.reminder.priority = (parseInt(starNum) + 1);
            this.addClassToStars(starNum, 'perm');
        });

        $('.priority-symbol').on('mouseleave', function () {
            $('.priority-symbol').removeClass('active');
        });
    }

    addClassToStars (num, className) {
        for (let x = 0; x <= num; x++) {
            $(`[star-num="${x}"]`).addClass(className);
        }
    }

}

function initReminderDetailController(option, id) {
    return new ReminderDetailController(option, id);
}

class ReminderOverviewController {
    constructor() {
        this.overviewEl = $('.reminder-list');
        ReminderStorageServiceClass
            .getReminders()
            .then((response) => {
                this.reminders = response;
                this.template = {};
                this.renderUI();
            });
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
            ReminderStorageServiceClass.updateFinishStatus(bool, id, this.reminders)
                .then(() => {
                    ReminderStorageServiceClass
                        .getReminders()
                        .then((response) => {
                            this.reminders = response;
                            this.renderUI();
                        });
                });
        });

        $('.list-container .btn-edit').on('click', (event) => {
            let id = $($(event.target)[0].attributes[0])[0].value;
            window.MCtrl.renderReminderDetailViewById(id);
        });
    }

    filterBy() {
        ReminderStorageServiceClass
            .getReminders()
            .then((response) => {
                this.reminders = response;
                this.renderUI();
            });
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
        // TODO implement style change!
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
