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
    const {date, details, semester, Id} = req.body;


        
        if(semester === 'first-semestar')
        {
            Calander.findByIdAndUpdate({_id: ObjectId(id)},{$push:{semester1: {date, details, Id}}})
            .then(result => {
            
                res.status(201).json(result);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({detail:"detail not created"})
            }); 
        }
        else {
            Calander.findByIdAndUpdate({_id: ObjectId(id)},{$push:{semester2:{date, details, Id}}})
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