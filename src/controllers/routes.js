const polyline = require('@mapbox/polyline');
const routeModel = require('../models/routes');

function getUserRoutes(req, res, next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    routeModel.getUserRoutes(req.params.userId)
    .then(result => {
        if(!result) next({status: 400, message: 'Routes not found'})
        const polylines = result[0].routes.map(line => line.polyline = polyline.decode(line.polyline))
        res.status(200).send({result})
    })
};

function dropUserRoute(req, res, next) {
    if (!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if (!req.params.routeId) return next({status: 400, message: "Bad Request, locId Required"});

    routeModel.deleteRoute(req.params.userId, req.params.routeId)
    .then(result => {
        if(!result) next({status: 400, message: "Can't find locations"})
        res.status(200).send({result})
    })

};

function createUserRoute(req, res, next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if(!req.body.name) return next({status: 400, message: "New Route must have a Name"});

    if(!req.body.polyline) return next({status: 400, message: "Route is missing Polyline Data"});

    const encodedLine = polyline.encode(req.body.polyline);

    routeModel.createRoute(req.params.userId, req.body.name, encodedLine)
    .then(result => {
        res.status(201).send({result})
    })
};

module.exports={
    getUserRoutes,
    createUserRoute,
    dropUserRoute
}