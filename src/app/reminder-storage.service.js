import {default as ReminderStorageUtil} from './reminder-storage.util';

class RemindersStorageService {
    constructor() {
        let temp = JSON.parse(localStorage.getItem('reminders'));
        this.reminders = temp ? temp : [];
    }

    getReminders() {
        return ReminderStorageUtil
            .getAll()
    }

    addReminder(reminder) {
        return ReminderStorageUtil.createReminder(reminder);
    }

    createReminder() {
        return new Reminder();
    }

    updateReminder(reminder) {
        return ReminderStorageUtil.updateReminder(reminder);
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

export default ReminderStorageServiceClass;