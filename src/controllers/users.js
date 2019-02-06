const userModel = require('../models/users');

function createUser(req, res, next) {
    if(!req.body.userName)
        return next({ status: 400, message: 'Missing User Name'});
      
    if(!req.body.password)
    return next({ status: 400, message: 'Missing Password'});

    if(!req.body.email)
    return next({ status: 400, message: 'Missing Email'});

    if(!req.body.zipCode)
    return next({ status: 400, message: 'Missing Zip Code'})
      
    userModel.createUser(req.body.userName, req.body.password, req.body.email, req.body.zipCode)
    .then(function(data) {
        res.status(201).send({ data })
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