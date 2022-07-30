const Degree = require('../Models/degreeModel');

const degree_index = (req, res) => {
    const {username} = req.query;

    Degree.findOne({ username })
        .then(result => {
            return res.status(200).json(result.levels)
        })
        .catch(err => console.log(err))
}

module.exports = {
    degree_index
}
