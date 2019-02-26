const polyline = require('@mapbox/polyline');
const alertModel = require('../models/alerts');
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: mailGunKey, domain: mailGunDomain});

function getUserAlerts(req, res, next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    alertModel.getUserAlerts(req.params.userId)
    .then(result => {
        if(!result) next({status: 400, message: 'Routes not found'})
        res.status(200).send({result})
    })
};

function createAlert(req,res,next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if(!req.body.name) return next({status: 400, message: "New Alert must have a Name"});

    if(req.body.type !== 'location' && req.body.type !== 'route') return next({status: 400, message: "Invalid Alert Type"});

    if(!req.body.frequency) return next({status: 400, message: "Invalid Alert Schedule Type!"})

    if(req.body.type === 'route') {
        const encodedLine = polyline.encode(req.body.polyline);
        console.log(encodedLine);
        alertModel.createAlert(req.params.userId, req.body.name, req.body.type, req.body.frequency, encodedLine, req.body.longitude, req.body.latitude)
        .then(result => {
            res.status(201).send({result})
        })
    } else {
        alertModel.createAlert(req.params.userId, req.body.name, req.body.type, req.body.frequency, req.body.polyine, parseFloat(req.body.latitude), parseFloat(req.body.longitude))
        .then(result => {
            res.status(201).send({result})
        })
    }
};

function sendAlert(req, res, next) {
    const data = {
        from: 'airways.com <me@samples.mailgun.org>',
        to: req.body.email,
        subject: 'Aiways.com Test Email',
        text: req.body.message
      };
       
      mailgun.messages().send(data, function (error, body) {});
};

function dropUserAlert(req, res, next) {
    if (!req.params.userId) return next({status: 400, message: "Bad Request, User Id Required"});

    if (!req.params.alertId) return next({status: 400, message: "Bad Request, Alert ID Required"});

    alertModel.deleteAlert(req.params.userId, req.params.alertId)
    .then(result => {
        if(!result) next({status: 400, message: "Can't find locations"})
        res.status(200).send({result})
    })

};

module.exports = {
    getUserAlerts,
    createAlert,
    sendAlert,
    dropUserAlert
};
