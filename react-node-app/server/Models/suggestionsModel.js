const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suggestionsSchema = new Schema({
    username: {type: Number},
    name: {type: String},
    department: {type: String},
    level: {type: String},
    type: {type: String},
    body: {type: String}
});

const Suggestions = mongoose.model('suggestions', suggestionsSchema);

module.exports = Suggestions;