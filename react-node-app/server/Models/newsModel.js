const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title: {type: String},
        body: {type: String},
        date: {type: String},
        dateNo: {type: String},
        image: {type: String}
    },
    {
        timestamps: true
    }
);

const News = mongoose.model("Advertisements",newsSchema);

module.exports = News;