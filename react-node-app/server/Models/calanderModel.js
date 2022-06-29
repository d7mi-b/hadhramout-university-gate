const mongoose = require('mongoose');
const {Schema} = mongoose;

const calanderSchema = new Schema({
    year: {type: String},
    semester1: {type:Array},
    semester2: {type:Array}
    },
    {
        timestamps : true,
    }
)

const calander = mongoose.model('calander', calanderSchema);

module.exports = calander;