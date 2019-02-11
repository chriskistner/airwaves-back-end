const db = require('../../db');

function getUserLocations(userId) {
    return db('users')
    .where('users.user_id', userId)
    .then(function(places){
        const promises = places.map(place => {
            return db('locations')
            .where('locations.user', userId)
            .then(function(data){
                place.locations = data
                return place
            })
        })
        return Promise.all(promises);
    })
};

function createLocation(userId, name, longitude, latitude) {
    return db('locations')
    .insert({
        user: userId,
        name: name,
        longitude: longitude,
        latitude: latitude
    })
    .returning('*')
    .then(function([data]){
        return data
    })
}

function getAllLocations() {
    return db('locations')
};

module.exports = {
    getAllLocations,
    getUserLocations,
    createLocation
}