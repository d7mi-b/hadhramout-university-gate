const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Employee = require('../Models/employeeModel')
const Advertisements = require('../Models/advertismentModel');
const Degree = require('../Models/degreeModel');
const Grievance = require('../Models/grievanceModel');
const news = require('../Models/newsModel');
const schedule = require('../Models/scheduleModel');
const Services = require('../Models/servicesModel');
const Suggestions = require('../Models/suggestionsModel');
const Transactions = require('../Models/transactionModel');
const walletCharge = require('../Models/walletchargeModel');

module.exports.get_collection = (req,res) => {
    const collection = req.params.id;

        
        mongoose.model(collection).find()
        .then(result => {
            res.status(200).json(result)
        } )
        .catch( err => {
            console.log(err)
            res.status(400).json({collection:"Not found"})
        }) 
    

   
}