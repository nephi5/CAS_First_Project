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
            this.reminders = this.reminders.filter((item) => !item.finished)
        }

        if (orderBy === 'finishDate') {
            this.reminders = this.reminders.sort((a, b) => {
                if (!NaN(a.finishDate))
                return a.finishDate - b.finishDate;
            })
        }

        if (orderBy === 'createdDate') {
            this.reminders = this.reminders.sort((a, b) => {
                return a.createdOn - b.createdOn;
            })
        }

        if (orderBy === 'importance') {
            this.reminders = this.reminders.sort((a, b) => {
                return b.priority - a.priority;
            })
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

export default ReminderStorageServiceClass;