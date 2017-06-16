import {default as ReminderStorageService} from './../reminder-storage.service';

class ReminderDetailController {
    constructor(option, id) {
        this.option = option;
        this.id = id ? id : null;
        this.mainView = $('.main-view');
        this.template = Handlebars.templates['reminder-detail'];

        if (this.option === 'create') {
            this.reminder = ReminderStorageService.createReminder();
        } else {
            this.reminder = ReminderStorageService.getReminderById(this.id);
        }

        this.renderUI();
        this.createPrioritySymbols();
        this.passValue();
        this.registerListeners();
    }

    saveChanges() {
        if (this.option === 'create') {
            ReminderStorageService.addReminder(this.reminder);
            window.MCtrl.renderReminderOverviewView();
        } else {
            ReminderStorageService.updateReminder(this.reminder);
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
        })

        $('.reminder-detail .input-note').on('keyup', (event) => {
            this.reminder.notes = event.target.value;
        })

        $('.reminder-detail .input-date').on('change', (event) => {
            this.reminder.dueDate = new Date(event.target.value);
        })
    }

    passValue() {
        let dueDate = this.reminder.dueDate === null ? '': moment(this.reminder.dueDate).format('YYYY-MM-DD');
        $('.reminder-detail .input-title')[0].value = this.reminder.title;
        $('.reminder-detail .input-note')[0].value = this.reminder.notes;
        $('.reminder-detail .input-date').val(dueDate);
        this.addClassToStars(this.reminder.priority - 1, 'active');
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
            thisaddClassToStars(starNum, 'perm');
        });

        $('.priority-symbol').on('mouseleave', function () {
            $('.priority-symbol').removeClass('active');
        })
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

export default initReminderDetailController;