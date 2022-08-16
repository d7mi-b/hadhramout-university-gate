const { ObjectId } = require('mongodb');
const Grievance = require('../Models/grievanceModel');
const Student = require('../Models/studentModel');

// add grievance to database
const grievancePost = (req, res) => {
    const grievance = new Grievance(req.body);

    grievance.save()
        .then(result => {
            Student.updateOne({username: req.body.username}, {
                $inc: {wallet: -req.body.amount},
                $push: {notification : {
                    id: new Date().getTime(),
                    notify: `تم رفع تظلم في مادة ${req.body.subject}`,
                    new: true,
                    date: new Date()
                }}
            })
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
        const grievance = await Grievance.find({department: department, state: state})
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

const getSingleGrevince = (req, res) => {
    const id = req.params.id;

    Grievance.find({ _id: ObjectId(id)})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));

}

// update state of a grievance
const updateStateGrv = async (req, res) => {
    const { _id, state, subject, username} = req.body;

    Grievance.updateOne({_id: ObjectId(_id)}, {$set: {state: state}})
        .then(result => {
            Student.updateOne({username: username}, {
                $push: {notification : {
                    id: new Date().getTime(),
                    notify: `تم تحديث حالة التظلم في مادة ${subject} إالى ${state}`,
                    new: true,
                    date: new Date()
                }}
            })
                .then(result => res.status(200).json(result))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// get all griveances of a student
const MyGrievance = async (req, res) => {
    const {username} = req.query;

    Grievance.find({ username: username })
        .sort({$natural: -1})
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => console.log(err))
}

module.exports = {
    grievancePost,
    grievanceGet,
    getSingleGrevince,
    updateStateGrv,
    MyGrievance
}