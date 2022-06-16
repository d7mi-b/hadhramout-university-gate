const Grievance = require('../Models/grievanceModel');

const grievancePost = (req, res) => {
    const grievance = new Grievance(req.body);

    grievance.save()
        .then(result => console.log('Done'))
        .catch(err => console.log(err));
}

module.exports = {
    grievancePost
}