import axios from 'axios';
const userModel = require('../models/users');
const googleUrl = process.env.GOOGLE_GEOCODE_URL
const key = process.env.GOOGLE_API_KEY

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
        userModel.createUser(req.body.userName, req.body.password, req.body.email, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)
    })
    .then(function(data){
        res.status(201).send({data})
    })
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


module.exports = {
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
}