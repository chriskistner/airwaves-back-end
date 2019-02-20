const polyline = require('@mapbox/polyline');
const axios = require('axios');
const mailGunUrl = process.env.MAILGUN_URL;
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: mailGunKey, domain: mailGunDomain});

function createAlert(req,res,next) {
    if(!req.params.userId) return next({status: 400, message: "Bad Request, UserId Required"});

    if(!req.body.name) return next({status: 400, message: "New Alert must have a Name"});

    if(req.body.type !== 'location' || req.body.type !== 'route') return next({status: 400, message: "Invalid Alert Type"});

    if(req.body.frequency !== 'daily' || req.body.type !== 'weekly') return next({status: 400, message: "Invalid Alert Schedule Type!"})

    if(!req.body.coordinates) return next({status: 400, message: "Unable to Associate Alert with a Location or Route"});

    const latitude = null;
    const longitude = null;
    const polyline = null;

    // if(req.body.coordinates)
};

function sendAlert(req, res, next) {
    const data = {
        from: 'airways.com <me@samples.mailgun.org>',
        to: req.body.email,
        subject: 'Aiways.com Test Email',
        text: req.body.message
      };
       
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
};

module.exports = {
    createAlert,
    sendAlert
};
