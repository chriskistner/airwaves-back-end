const axios = require('axios');
const locationModel = require('../models/locations');
const alertModel = require('../models/alerts');
const googleUrl = process.env.GOOGLE_GEOCODE_URL;
const key = process.env.GOOGLE_API_KEY;

function getAllLocations (req, res, next) {
    locationModel.getAllLocations()
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
};

function getUserLocation(req, res, next) {
    if (!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if (!req.params.locId) return next({status: 400, message: "Bad Request, locId Required"});

    locationModel.getUserLocation(req.params.userId, req.params.locId)
    .then(result => {
        if(!result) next({status: 400, message: "Can't find locations"})
        res.status(200).send({result})
    })

};

function dropUserLocation(req, res, next) {
    if (!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if (!req.params.locId) return next({status: 400, message: "Bad Request, locId Required"});

    locationModel.getUserLocation(req.params.userId, req.params.locId)
    .then(response => {
        alertModel.getUserAlerts(req.params.userId)
        .then(alerts => {
            const location = response.name;
            const userAlerts = alerts[0].alerts
            const found = userAlerts.filter(alert => alert.type === 'location' && alert.name === location);

            if(found.length !== 0) {
                locationModel.deleteLocation(req.params.userId, req.params.locId)
                .then(result => {
                    if(!result) next({status: 400, message: "Can't find locations"})
                    return alertModel.deleteAlert(req.params.userId, found[0].id)
                })
                .then(result => {
                    res.status(200).send({result})
                }) 
            } else {
                locationModel.deleteLocation(req.params.userId, req.params.locId)
                .then(result => {
                    if(!result) next({status: 400, message: "Can't find locations"})
                    res.status(200).send({result})
                })
            }
        })
    })
};

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
        return locationModel.createLocation(req.params.userId, req.body.name, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)
    })
    .then(result => {
        res.status(201).send({result})
    })
};

module.exports = {
    getAllLocations,
    getUserLocations,
    getUserLocation,
    dropUserLocation,
    createLocations
}