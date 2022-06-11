const Advertisements = require('../Models/advertismentModel');


module.exports.get_advertisement= async (req,res) => {
  
    try{
        const advertisement = await Advertisements.find()
        
        res.status(200).json(advertisement);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({advertisement: "advertisement is no news"})
        }
}


module.exports.add_advertisement= async (req,res) => {
   
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