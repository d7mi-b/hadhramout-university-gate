const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicesSchema = new Schema({
  _id: {type: Number},
  name: {type: String},
  state: {type: Boolean},
  price: {type: Number},
  type: {type: String}
});

const Services = mongoose.model("services", servicesSchema);
module.exports = Services;
