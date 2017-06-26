const Datastore = require('nedb');
const db = new Datastore({filename: './data/new-reminders2.db', autoload: true});

const dataStoreObj = {
    addReminder: addReminder,
    getAll: getAll,
    updateReminder: updateReminder,
    getById: getById
}

function getAll(query, callback) {
    let bool = JSON.parse(query.filterBy);
    let filterBy = !bool ? {} : {finished: !bool};
    if (query.orderBy) {
        let sortBy = {[query.orderBy]: query.orderBy === 'dueDateByNum' ? 1 : -1};
        db.find(filterBy).sort(sortBy).exec(function (err, reminders) {
            callback(err, reminders);
        })
    } else {
        db.find(filterBy).exec(function (err, reminders) {
            callback(err, reminders);
        })
    }
}

function updateReminder(id, reminder, callback) {
    reminder.dueDateByNum = new Date(reminder.dueDate).getTime();
    db.update({_id: id}, reminder, {}, function (err, numReplaced) {
        callback(err, numReplaced);
    })
}

function getById(id, callback) {
    db.findOne({_id: id}, function (err, reminder) {
        callback(err, reminder);
    })
}

function addReminder(reminder, callback) {
    reminder.dueDateByNum = new Date(reminder.dueDate).getTime();
    db.insert(reminder, function (err, newDoc) {
        if(callback) {
            callback(err, newDoc);
        }
    })
}

module.exports = dataStoreObj;

