const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('../db');

let db;

connectToDb((err) => {
    if (!err) {
        db = getDb();
    }
})

const news_index = (req, res, next) => {
    let News = []
    
    db.collection('News')
        .find()
        .forEach(news => News.push(news))
        .then(() => {
            return res.status(200).json(News);
        })
        .catch(() => {
            return res.status(500).json({ error: 'could not fetch the documents'});
        })
}

module.exports = {
    news_index
}