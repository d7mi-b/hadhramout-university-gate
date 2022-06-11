const News = require("../Models/newsModel");


//add news

module.exports.addNews= async (req,res) => {

    const news = req.body;

    try{
        const news_ = await News.create(news);
        res.status(201).json(news_)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({New: "News not created"})
    }

}


//To get news

module.exports.news_index = async (req,res) => {

    try{
    const news = await News.find()
    
    res.status(200).json(news);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({new: "there is no news"})
    }
}