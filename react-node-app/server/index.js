const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
        db = getDb();
    }
})

app.get('/api', (req, res) => {
    // res.json({msg: 'Hello from server!'});
    db.collection('Students')
        .findOne( { _id: ObjectId("6299ad4c0f544c9fcebdfe85")})
        .then(doc=> {
            return res.status(200).json(doc);
        })
        .catch(() => {
            return res.status(500).json({ error: 'could not fetch the documents'});
        })
});

app.get('/news', (req, res) => {
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
});

app.get('/advertisements', (req, res) => {
    let Advertisements = []
    
    db.collection('Advertisements')
        .find()
        .forEach(advertisement => Advertisements.push(advertisement))
        .then(() => {
            return res.status(200).json(Advertisements);
        })
        .catch(() => {
            return res.status(500).json({ error: 'could not fetch the documents'});
        })
});