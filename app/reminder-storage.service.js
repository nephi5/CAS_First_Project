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

const ReminderStorageServiceClass = new RemindersStorageService();

export default ReminderStorageServiceClass;