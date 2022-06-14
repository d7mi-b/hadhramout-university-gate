const mongoose = require('mongoose');
const {Schema} = mongoose;

const degreeSchema = new Schema({
    username: {type: Number},
    name: {type: String},
    department: {type: String},
    levels: {type: Array}
    },
    {
        timestamps : true,
    }
)

const Degree = mongoose.model('degrees', degreeSchema);

module.exports = Degree;