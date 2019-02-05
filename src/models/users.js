const db = require('../../db');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

function getUser(userId) {
    return db('users')
    .where({id: userId})
    .then(function([result]) {
        if(result){
            return result
        }
        else {
            throw {status: 400, message: "User Not Found"}
        }
    })
};

function getAllUsers() {
    return db('users')
};

function deleteUser(userId) {
    return db('users')
    .del()
    .where({id: userId})
    .returning('*')
    .then(function([data]) {
        delete data.userId
        return data
    })
};

function createUser(userName, password, userEmail, zipCode) {
    return db('users')
    .where({email: userEmail })
    .then(function([result]) {
        if(result) {
            throw {status: 400, message: "User Already Exists"}
        } else {
            return bcrypt.hash(password, 10)
        }
    })
    .then(function(hashedPassword) {
        return (
            db('users')
            .insert({
                user_id: uuidv4().splice(0, 7),
                user_name: userName,
                email: userEmail,
                password: hashedPassword,
                zip_code: zipCode
            })
            .returning('*')
        )
    })
    .then(function([ data ]) {
        delete data.password;
        return data
    })
};

module.exports = {
    getUser,
    createUser,
    getAllUsers,
    deleteUser,
};