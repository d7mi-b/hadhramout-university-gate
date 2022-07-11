const Transactions = require('../Models/transactionModel');
const Student = require('../Models/studentModel');

module.exports.postTransaction = async (req, res) => {
    
    Transactions.create(req.body)
    .then(result => {
        Student.updateOne({username: req.body.username}, {
            $inc: {wallet: -req.body.price},
            $push: {notification : {
                id: new Date().getTime(),
                notify: `تم إصدار ${req.body.service}`,
                new: true,
                date: new Date()
            }}
        })
            .then(result => res.status(200).json(result))
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}