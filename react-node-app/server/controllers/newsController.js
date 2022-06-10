const News = require("../Models/newsModel");
// const { ObjectId } = require('mongodb');
// const { connectToDb, getDb } = require('../db');

// let db;

// connectToDb((err) => {
//     if (!err) {
//         db = getDb();
//     }
// })

const news_index = (req, res) => {
    // let News = []
    
    // db.collection('News')
    //     .find()
    //     .forEach(news => News.push(news))
    //     .then(() => {
    //         return res.status(200).json(News);
    //     })
    //     .catch(() => {
    //         return res.status(500).json({ error: 'could not fetch the documents'});
    //     })

    News.find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
}

module.exports = {
    news_index
}