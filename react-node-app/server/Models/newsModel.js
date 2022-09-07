const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const multer = require('multer');

const newsSchema = new Schema(
    {
        title: {type: String},
        body: {type: String},
        date: {type: Date},
        img: {
            data: Buffer,
            contentType: String
        },
        employee: {type:Number}
    });

const News = mongoose.model("news",newsSchema);

module.exports = News;
