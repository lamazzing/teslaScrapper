var mongoose = require('mongoose');

var OfferSchema = new mongoose.Schema(
    {
        images: [],
        title: String,
        price: String,
        pubDate: Date,
        criteria: [],
        description: String,
        place: String,
        seller: String,
        tel: String 
    }, { minimize: false });

var Offer = mongoose.model('Offer', OfferSchema);

module.exports = { Offer };