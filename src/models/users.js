const db = require('../../db');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

function getUser(userId) {
    return db('users')
    .where({user_id: userId})
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

function createUser(userName, password, userEmail, latitude, longitude) {
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
        const newId = uuidv4();
        return (
            db('users')
            .insert({
                user_id: newId.slice(0,8),
                user_name: userName,
                email: userEmail,
                password: hashedPassword,
                home_latitude: latitude,
                home_longitude: longitude
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