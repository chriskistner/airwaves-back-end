const axios = require('axios');
const locationModel = require('../models/locations');
const googleUrl = process.env.GOOGLE_GEOCODE_URL;
const key = process.env.GOOGLE_API_KEY;

function getAllLocations (req, res, next) {
    userModel.getAllLocations()
    .then(result => {
        if(!result) next({ status: 400, message: "Server Error"});
        res.status(200).send({ result})
    })
};

function getUserLocations(req, res, next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    locationModel.getUserLocations(req.params.userId)
    .then(result => {
        if(!result) next({status: 400, message: 'Locations not found'})
        res.status(200).send({result})
    })
}

function createLocations(req, res, next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if(!req.body.name) return next({status: 400, message: "New Location must have a Name"});

    if (!req.body.city) return next({status: 400, message: "New Location must have a valid City"});

    if (!req.body.state) return next({status: 400, message: "New Location must have a valid state"});

    const formatAddress = req.body.address.replace(' ', '+');
    const formatState = req.body.state.toUpperCase();
    const formatCity = req.body.city.replace(' ', '+');

    axios.get(`${googleUrl}${formatAddress},+${formatCity},+${formatState}&key=${key}`)
    .then(response => { 
        locationModel.createLocation(req.params.userId, req.body.name, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)
    })
    .then(result => {
        console.log(result)
        res.status(201).send({result})
    })
}

module.exports = {
    getAllLocations,
    getUserLocations,
    createLocations
}