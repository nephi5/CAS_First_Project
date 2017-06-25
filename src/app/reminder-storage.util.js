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

        let queryString = `?filterBy=${filterBy}`
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
        console.log('reminder-storage-util reminder:');
        console.log(reminder);
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

export default new ReminderStorageUtil();