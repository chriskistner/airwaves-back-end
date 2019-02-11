const locationModel = require('../models/locations')

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

module.exports = {
    getAllLocations,
    getUserLocations
}