const { ObjectId } = require('mongodb');
const Grievance = require('../Models/grievanceModel');

// add grievance to database
const grievancePost = (req, res) => {
    const grievance = new Grievance(req.body);

    grievance.save()
        .then(result => console.log('Done'))
        .catch(err => console.log(err));
}

// get grievanes
const grievanceGet = async (req, res) => {

    try {
        const grievance = await Grievance.find();
        res.status(200).json(grievance);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({new: "there is no news"})
    }
}

// update state of a grievance
const updateStateGrv = async (req, res) => {
    const { _id, state} = req.body;

    Grievance.updateOne({_id: ObjectId(_id)}, {$set: {state: req.body.state}})
        .then(result => {
            console.log(result)
            return res.status(200);
        })
        .catch(err => console.log(err));
}

// get all griveances of a student
const MyGrievance = async (req, res) => {
    const {username} = req.query;

    Grievance.find({ username: username })
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => console.log(err))
}

module.exports = {
    grievancePost,
    grievanceGet,
    updateStateGrv,
    MyGrievance
}