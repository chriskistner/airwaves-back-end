const axios = require('axios');
const userModel = require('../models/users');
const email = require('../../emailtemplates/welcomeEmail');
const googleUrl = process.env.GOOGLE_GEOCODE_URL;
const key = process.env.GOOGLE_API_KEY;
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: mailGunKey, domain: mailGunDomain});

function createUser(req, res, next) {

    if(!req.body.userName)
        return next({ status: 400, message: 'Missing User Name'});
      
    if(!req.body.password)
        return next({ status: 400, message: 'Missing Password'});

    if(!req.body.email)
        return next({ status: 400, message: 'Missing Email'});

    if (!req.body.address)
        return next({status: 400, message: 'Missing Home Address'});

    if(!req.body.city)
        return next({status: 400, message: 'Missing Home City'});

    if(!req.body.state || req.body.state.length > 2)
        return next({status: 400, message: 'Missing Valid Home State'});

    const formatAddress = req.body.address.replace(' ', '+');
    const formatState = req.body.state.toUpperCase();
    const formatCity = req.body.city.replace(' ', '+');

    axios.get(`${googleUrl}${formatAddress},+${formatCity},+${formatState}&key=${key}`)
    .then(function(response){ 
        return userModel.createUser(req.body.userName, req.body.password, req.body.email, req.body.address, req.body.city, formatState, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)
    })
    // .then(function(data){
    //     const message = {
    //         from: 'airways.com <me@samples.mailgun.org>',
    //         to: data.email,
    //         subject: 'Welcome to Airways',
    //         html: email.welcomeEmail(data.user_name, data.address, data.city, data.state)
    //       };
    //     return mailgun.messages().send(message);
    // })
    .then(data => {
        res.status(201).send({data})
    })
    .catch(next) 
};

function getUser (req, res, next) {
    if(!req.params.userId) return next({status: 400, message: 'Bad Request, UserID is required'});

    userModel.getUser(req.params.userId)
    .then(result => {
        if(!result) next({ status: 400, message: "User Not Found"});
        res.status(200).send({ result })
    })
};

function getAllUsers (req, res, next) {
    userModel.getAllUsers()
    .then(result => {
        if(!result) next({ status: 400, message: "Server Error"});
        res.status(200).send({ result})
    })
};

function deleteUser (req, res, next) {
    userModel.deleteUser(req.params.user_id)
    .then(result => {
        if(!result) next({ status: 400, message: "User does not Exist"});
        res.status(200).send({ result})
    })
};

function updateUser(req, res, next) {
    if(!req.body.userName)
    return next({ status: 400, message: 'Missing User Name'});
  
    if(!req.body.password)
    return next({ status: 400, message: 'Missing Password'});

    if(!req.body.email)
    return next({ status: 400, message: 'Missing Email'});

    if (!req.body.address)
    return next({status: 400, message: 'Missing Home Address'});

    if(!req.body.city)
    return next({status: 400, message: 'Missing Home City'});

    if(!req.body.state || req.body.state.length > 2)
    return next({status: 400, message: 'Missing Valid Home State'});

    const formatAddress = req.body.address.replace(' ', '+');
    const formatState = req.body.state.toUpperCase();
    const formatCity = req.body.city.replace(' ', '+');

    axios.get(`${googleUrl}${formatAddress},+${formatCity},+${formatState}&key=${key}`)
    .then(function(response){ 
        return userModel.updateUser(req.params.userId, req.body.userName, req.body.password, req.body.email, req.body.address, req.body.city, req.body.state, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)
    })
    .then(function(data){
        res.status(201).send({data})
    })

};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser
}