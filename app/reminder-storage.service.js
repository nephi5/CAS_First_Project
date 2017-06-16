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
                if (a.dueDate === null) {
                    return 1;
                }

                if (b.dueDate === null) {
                    return -1;
                }

                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            })
        }

        if (orderBy === 'createdDate') {
            this.reminders = this.reminders.sort((a, b) => {
                let aDate = new Date(a.createdOn).getTime();
                let bDate = new Date(b.createdOn).getTime();
                return bDate - aDate;
            })
        }

        if (orderBy === 'importance') {
            this.reminders = this.reminders.sort((a, b) => {
                return b.priority - a.priority;
            })
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

export default ReminderStorageServiceClass;