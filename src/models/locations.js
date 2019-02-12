const db = require('../../db');

function getUserLocations(userId) {
    return db('users')
    .where('users.user_id', userId)
    .then(function(places){
        const promises = places.map(place => {
            return db('locations')
            .where('locations.user', userId)
            .orderBy('locations.created_at', 'desc')
            .orderBy('locations.updated_at', 'desc')
            .then(function(data){
                place.locations = data
                return place
            })
        })
        return Promise.all(promises);
    })
};

function getUserLocation(userId, locationId){
    return db('locations')
    .first()
    .where({
        id: locationId,
        user: userId
    })
    .returning('*')
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
};

function deleteLocation(userId, locationId) {
    return db('locations')
    .del()
    .where({
        id: locationId,
        user: userId
    })
    .returning('*')
}

function getAllLocations() {
    return db('locations')
};

module.exports = {
    getAllLocations,
    getUserLocations,
    getUserLocation,
    deleteLocation,
    createLocation
}