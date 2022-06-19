const Suggestions = require('../Models/suggestionsModel');

module.exports.suggestionsPost = async (req, res) => {
    const suggestions = new Suggestions(req.body);

    suggestions.save()
        .then(result => console.log('Done'))
        .catch(err => console.log(err));
}

module.exports.suggestionsGet = async (req, res) => {
    try {
        const suggestion = await Suggestions.find();
        res.status(200).json(suggestion);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({new: "there is no news"})
    }
}