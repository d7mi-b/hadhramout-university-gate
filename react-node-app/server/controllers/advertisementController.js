const Advertisements = require('../Models/advertismentModel');


module.exports.get_advertisement = async (req,res) => {

    try{
        const advertisement = await Advertisements.find().sort({$natural: -1})

        res.status(200).json(advertisement);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({advertisement: "advertisement is no news"})
        }
}


module.exports.add_advs = async (req, res) => {

    const advertisement = req.body;

    try{
        const adver = await Advertisements.create(advertisement);
        res.status(201).json(adver)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({advertisement: "advertisement not created"})
    }
}


module.exports.deleteAdv= async (req,res) => {
    const id = req.params.id;
        try{
            const adv = await Advertisements.findByIdAndDelete(id)
            res.status(200).json(adv)
        }
        catch(err) {
            console.log(err);
        }
}
