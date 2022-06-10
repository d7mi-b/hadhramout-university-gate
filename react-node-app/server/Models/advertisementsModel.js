const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = new Schema(
    {
        title: {type: String},
        body: {type: String},
        date: {type: String},
        dateNo: {type: String},
    },
    {
        timestamps: true
    }
);

const Advertisements = mongoose.model("advertisements", advertisementSchema);

module.exports = Advertisements;