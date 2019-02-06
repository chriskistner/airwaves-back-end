const authModel = require('../models/auth');
const jwt = require('jsonwebtoken');

function login (req, res, next) {
    if(!req.body.email) {
        return next({status: 400, error: "Login email required"})
    };

    if(!req.body.password) {
        return next({ status: 400, error: "password required"})
    }

    authModel.login(req.body.email, req.body.password)
        .then(function(user) {
            const token = jwt.sign({id: user.user_id}, process.env.SECRET)

            return res.status(200).send({ token })
        })
        .catch((err) => {
            next({status: 400, error: "login attempt failed"})
        });
};

function getAuthStatus(req, res, next) {
    res.status(200).send({id:req.claim.id})
};

function userAuthenticated(req, res, next) {
    if(!req.headers.authorization) {
        return next({status: 401, error: "Token Missing!"})
    }

    const [scheme, credentials] = req.headers.authorization.split(' ');

    jwt.verify(credentials, process.env.SECRET, (err, payload) => {
        if(err) {
            return next({status: 401, error: "Token did not authenticate"})
        }

        req.claim = payload;

        next()
    })
};

function isSelf(req, res, next) {
    if(req.params.userId !== req.claim.id) {
        return next({ status: 401, error: "Is Not Self"})
    }
    next()
};

module.exports = {
    login,
    getAuthStatus,
    userAuthenticated,
    isSelf
};