const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    department: {type: String},
    level: {type: String},
    semester: {type: String},
    group1: {type: String},
    group2: {type: String},
    subjects:{type: Array}
});

const schedule = mongoose.model('schedule', scheduleSchema);

module.exports = schedule;