const db = require('../../db');


function getUserRoutes(userId) {
    return db('users')
    .where('users.user_id', userId)
    .then(function(lines){
        const promises = lines.map(line => {
            return db('routes')
            .where('routes.user', userId)
            .orderBy('routes.created_at', 'desc')
            .orderBy('routes.updated_at', 'desc')
            .then(function(data){
                line.routes = data
                return line
            })
        })
        return Promise.all(promises);
    })
};

function getUserRoute(userId, routeId){
    return db('routes')
    .first()
    .where({
        id: routeId,
        user: userId
    })
    .returning('*')
};

function createRoute(userId, name, polyline) {
    return db('routes')
    .insert({
        user: userId,
        name: name,
        polyline: polyline,
    })
    .returning('*')
};

function deleteRoute(userId, routeId) {
    return db('routes')
    .del()
    .where({
        id: routeId,
        user: userId
    })
    .returning('*')
};

module.exports={
    getUserRoutes,
    getUserRoute,
    createRoute,
    deleteRoute
}