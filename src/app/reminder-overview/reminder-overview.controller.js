import { default as ReminderStorageService } from './../reminder-storage.service';

class ReminderOverviewController {
    constructor() {
        this.overviewEl = $('.reminder-list');
        ReminderStorageService
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
            ReminderStorageService.updateFinishStatus(bool, id, this.reminders)
                .then(() => {
                    ReminderStorageService
                        .getReminders()
                        .then((response) => {
                            this.reminders = response;
                            this.renderUI();
                        });
                });
        })

        $('.list-container .btn-edit').on('click', (event) => {
            let id = $($(event.target)[0].attributes[0])[0].value;
            window.MCtrl.renderReminderDetailViewById(id);
        })
    }

    filterBy() {
        ReminderStorageService
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

export default initReminderController;


