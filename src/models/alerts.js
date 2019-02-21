const db = require('../../db');

function getUserAlerts(userId) {
    return db('users')
    .where('users.user_id', userId)
    .then(function(emails){
        const promises = emails.map(email => {
            return db('alerts')
            .where('alerts.user_id', userId)
            .orderBy('alerts.created_at', 'desc')
            .orderBy('alerts.updated_at', 'desc')
            .then(function(data){
                email.alerts = data
                return email
            })
        })
        return Promise.all(promises);
    })
};

function createAlert(userId, name, type, freq, polyline, latitude, longitude) {
    return db('alerts')
    .insert({
        user_id: userId,
        type: type,
        polyline: polyline,
        longitude: longitude,
        latitude: latitude,
        alert_frequency: freq,
        name: name
    })
    .returning('*')
    .catch(console.log) 
};

function deleteAlert(userId, alertId) {
    return db('alerts')
    .del()
    .where({
        id: alertId,
        user_id: userId
    })
    .returning('*')
};

module.exports = {
    getUserAlerts,
    createAlert,
    deleteAlert
}