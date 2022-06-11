const { ObjectId } = require("mongodb");
const News = require("../Models/newsModel");

const news_index = (req, res) => {
    News.find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
}

const single_news = (req, res) => {
    const id = req.params.id;

    News.findById(ObjectId(id))
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
}

module.exports = {
    news_index,
    single_news
}