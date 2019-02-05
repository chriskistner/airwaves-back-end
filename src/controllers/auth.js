const authModel = require('../models/auth');
const jwt = require('jsonwebtoken');

function login (req, res, next) {
    if(!req.body.userEmail) {
        return next({status: 400, error: "Login email required"})
    };

    if(!req.body.password) {
        return next({ status: 400, error: "password required"})
    }

    authModel.login(req.body.userName, req.body.password)
        .then(function(user) {
            const token = jwt.sign({id: user.id}, process.env.SECRET)

            return res.status(200).send({ token })
        })
        .catch((err) => {
            next({status: 400, error: "login attempt failed"})
        });
}

function getAuthStatus(req, res, next) {
    res.status(200).send({id:req.claim.id})
};

function userAuthenticated(req, res, next) {
    if(!req.headers.authorization) {
        return next({status: 401, error: "Unauthorized User!"})
    }

    const [scheme, credentials] = req.headers.authorization.split(' ');

    jwt.verify(credentials, process.env.SECRET, (err, payload) => {
        if(err) {
            return next({status: 401, error: "Unauthorized User!"})
        }

        req.claim = payload;

        next()
    })
};

function isSelf(req, res, next) {
    if(parseInt(req.params.user_id) !== req.claim.id) {
        return next({ status: 401, error: "Unauthorized User"})
    }
    next()
}

module.exports = {
    login,
    getAuthStatus,
    userAuthenticated,
    isSelf
}