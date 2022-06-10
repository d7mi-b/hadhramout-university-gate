const Advertisements = require('../Models/advertisementsModel');

const advertisements_index = (req, res) => {
    Advertisements.find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}

module.exports = {
    advertisements_index
}