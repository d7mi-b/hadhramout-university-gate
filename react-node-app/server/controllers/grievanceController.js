const { ObjectId } = require('mongodb');
const Grievance = require('../Models/grievanceModel');
const Student = require('../Models/studentModel');

// add grievance to database
const grievancePost = (req, res) => {
    const grievance = new Grievance(req.body);

    grievance.save()
        .then(result => {
            Student.updateOne({username: req.body.username}, {$set: {wallet: req.body.wallet}})
                .then(result => res.status(200).json(result))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// get grievanes
const grievanceGet = async (req, res) => {
    const {department, page, state} = req.query;

    const pages = page || 0;
    const grvPerPage = 5;

    try {
        const grievance = await Grievance.find({department: department})
            .sort({$natural: -1})
            .skip(pages * grvPerPage)
            .limit(grvPerPage)
            
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
    const {username, page, state} = req.query;

    const pages = page || 0;
    const grvPerPage = 5;

    Grievance.find({ username: username, state: state })
        .sort({$natural: -1})
        .skip(pages * grvPerPage)
        .limit(grvPerPage)
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