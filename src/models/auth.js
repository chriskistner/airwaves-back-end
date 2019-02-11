const bcrypt = require('bcrypt')
const db = require('../../db')

function login(userEmail, password) {
    let user;
    return db('users')
        .first()
        .select('*')
        .where('email', userEmail)
        .then(function(data) {
            if (!data) throw {stats: 400, error: "Unauthorized Login!"};

            user = data;
            console.log(user)
            return bcrypt.compareSync(password, data.password)
        })
        .then(function(status) {
            if(!status) throw {status: 400, error: "Unauthorized Login!"};

            delete user.password;

            return user;
        })
    }

module.exports = { login }