const mongoose = require('mongoose');
const { Schema } = mongoose;


const advertisementSchema = new Schema(
    {
        title:{type: String} ,
        date: {type: String}
    },
    {
        timestamps: true
    }
)

const Advertisements = mongoose.model("Advertisements",advertisementSchema)
module.exports = Advertisements;