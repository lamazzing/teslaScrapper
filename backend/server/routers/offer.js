const express = require('express');
const {Offer} = require('../models/offers');
var _ = require('lodash');
const router = new express.Router()

 router.get('/offers/', async (req, res) => {
    try {
        const offers = await Offer.find();
        console.log('ok');
        res.status(200).send(offers);
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

 module.exports = router