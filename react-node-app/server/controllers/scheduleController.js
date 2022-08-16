const Schedule = require('../Models/scheduleModel')
const { ObjectId } = require('mongodb');

module.exports.addSchedule= async (req,res) => {

    const data= req.body;

    try{
        const schedule = await Schedule.create(data)
        res.status(201).json(schedule._id);

    }
    catch(err){
        console.log(err);
        res.status(400).json({schedule:"schedule not created"})
    }

}

module.exports.addSubjects = (req,res) => {
    const id = req.params.id;
    const data = req.body;

        Schedule.findByIdAndUpdate({_id: ObjectId(id)},{$push:{subjects:data}})
        .then(result => {
            
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({subject:"subject not created"})
        }); 
}


module.exports.getSchedule = (req,res) => {
    const department = req.params.department;
    const level = req.params.level;
    const semester = req.params.semester;
    const group1 = req.params.group1;
    const group2 = req.params.group2;

    Schedule.findOne({department, level, semester, group1, group2})
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err)
        res.status(400).json({subjects:"subject not found"})
    })
}


module.exports.deleteSubj = async (req,res) => {
    const id = req.params.id;
    const {id2} = req.body;

    Schedule.updateOne({_id: ObjectId(id)}, {$pull: { subjects: {Id: id2} }})
    .then(result => res.status(200).json(result.subjects))
    .catch(err => console.log(err))

}