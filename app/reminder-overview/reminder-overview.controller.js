import { default as ReminderStorageService } from './../reminder-storage.service';

class ReminderOverviewController {
    constructor() {
        // ReminderStorageService.addReminder('Hello World', 'This is my note', 3, '08-02-2017');
        // ReminderStorageService.addReminder('Another Title', 'Some more notetaking here', 4, '06-19-2017');
        this.overviewEl = $('.reminder-list');
        this.reminders = ReminderStorageService.getReminders();
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
            ReminderStorageService.updateFinishStatus(bool, id);
            this.reminders = ReminderStorageService.getReminders();
            this.renderUI();
        })
    }

    filterBy() {
        this.reminders = ReminderStorageService.getReminders();
        this.renderUI();
    }
}

function initReminderController() {
    return new ReminderOverviewController();
}

export default initReminderController;


