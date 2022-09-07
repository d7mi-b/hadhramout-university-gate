const Suggestions = require('../Models/suggestionsModel');

module.exports.suggestionsPost = async (req, res) => {
    const suggestions = new Suggestions(req.body);

    suggestions.save()
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
}

module.exports.suggestionsGet = async (req, res) => {
    const {page} = req.query;

    const pages = page || 0;
    const grvPerPage = 7;

    try {
        const suggestion = await Suggestions.find()
            .sort({$natural: -1})
            .skip(pages * grvPerPage)
            .limit(grvPerPage)
            
        res.status(200).json(suggestion);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({new: "there is no news"})
    }
}