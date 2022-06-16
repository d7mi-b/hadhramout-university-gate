const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grievanceSchema = mongoose.Schema(
    {
        username: {type: Number},
        name: {type: String},
        department: {type: String},
        level: {type: String},
        date: {type: Date},
        subject: {type: String},
        degree: {type: String},
        reson: {type: String},
        type: {type: String},
        state: {type: Boolean}
    },
    {
        timestamps: true
    }
);

const Grievance = mongoose.model('grievances', grievanceSchema);

module.exports = Grievance;