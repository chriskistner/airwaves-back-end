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
        name: name,
        type: type,
        alert_frequency: freq,
        polyline: polyline,
        longitude: longitude,
        latitude: latitude
    })
    .returning('*')
};

module.exports = {
    getUserAlerts,
    createAlert
}