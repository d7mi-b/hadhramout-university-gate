const Services = require('../Models/servicesModel')

module.exports.checkPrice = async (req, res) => {
  const {name, type} = req.query;

  Services.findOne({name, type})
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err))
}
