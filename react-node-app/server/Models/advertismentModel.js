const mongoose = require('mongoose');
const { Schema } = mongoose;


const advertisementSchema = new Schema(
    {
        title:{type: String} ,
        date: {type: Date}
    }
)

const Advertisements = mongoose.model("advertisements", advertisementSchema)
module.exports = Advertisements;
