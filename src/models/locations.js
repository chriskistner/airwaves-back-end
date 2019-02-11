const db = require('../../db');

function getUserLocations(userId) {
    return db('locations')
    .where({user: userId})
    .orderBy('created_at', 'desc')
    .orderBy('updated_at', 'desc')
    .returning('*')
    .then(function([result]) {
        if(result){
            return result
        }
        else {
            throw {status: 400, message: "User has no Locations"}
        }
    })
};

function getAllLocations() {
    return db('locations')
};

module.exports = {
    getAllLocations,
    getUserLocations
}