import { default as ReminderStorageService } from './../reminder-storage.service';

class ReminderOverviewController {
    constructor() {
        this.overviewEl = $('.reminders-overview');
        this.reminders = ReminderStorageService.getReminders();
        this.template = Handlebars.templates['reminder-list'];
        this.renderUI();
    }

    renderUI() {
        this.overviewEl.append(this.template({reminders: this.reminders}));
    }
}

function initReminderController() {
    return new ReminderOverviewController();
}

export default initReminderController;


