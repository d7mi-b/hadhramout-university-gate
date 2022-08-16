const Calander = require('../Models/calanderModel');
const { ObjectId } = require('mongodb');



module.exports.add_cal= async (req,res) => {
    
    const year = req.body;

    try{
        const calander = await Calander.create(year);
        res.status(201).json(calander._id)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({calander: "calander not created"})
    }
}

module.exports.add_details = (req,res) => {
    const id = req.params.id;
    const {date, details, semester, Id, hijridate} = req.body;


        
        if(semester === 'first-semestar')
        {
            Calander.findByIdAndUpdate({_id: ObjectId(id)},{$push:{semester1: {date, hijridate, details, Id}}})
            .then(result => {
            
                res.status(201).json(result);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({detail:"detail not created"})
            }); 
        }
        else {
            Calander.findByIdAndUpdate({_id: ObjectId(id)},{$push:{semester2:{date, hijridate, details, Id}}})
            .then(result => {
            
                res.status(201).json(result);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({detail:"detail not created"})
            }); 
        }
}

module.exports.get_cal = (req,res) => {
    const year = req.params.year;

    Calander.findOne({year})
    .then(result => {
        res.status(200).json(result)
    } )
    .catch( err => {
        console.log(err)
        res.status(400).json({calander:"Not found"})
    })
}

module.exports.deleteDet = async (req,res) => {
    const id = req.params.id;
    const {Id, sem} = req.body;

    
    if(sem === 'sem1')
    {
        Calander.updateOne({_id: ObjectId(id)}, {$pull: { semester1: {Id} }})
        .then(result => res.status(200).json(result.id))
        .catch(err => console.log(err))
    }
    else{
        Calander.updateOne({_id: ObjectId(id)}, {$pull: { semester2: {Id} }})
        .then(result => res.status(200).json(result.id))
        .catch(err => console.log(err))
    }
}

module.exports.get_last = async (req,res) => {

    
    try{
        const get = await Calander.findOne().sort({year:-1})
            res.status(200).json(get)
    }
    catch(err){
        console.log(err)
        res.status(400).json({calander: "there is no calander"})
    }
}
