const db = require('../../db');

function getUserLocations(userId) {
    return db('locations')
    // .join('locations', 'users.user_id', 'locations.user_id')
    .where({'locations.user_id': userId})
    .orderBy('locations.created_at', 'desc')
    .orderBy('locations.updated_at', 'desc')
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