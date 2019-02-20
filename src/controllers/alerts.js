const axios = require('axios');
const mailGunUrl = process.env.MAILGUN_URL;
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;



function sendAlert(req, res, next) {
    axios.post(`${mailGunUrl}/${mailGunDomain}/messages`,{
        auth: {
            username: 'api',
            password: mailGunKey
        },
        params: {
            from: 'Airways.com <noreply@yourdomain.com>',
            to: req.body.email,
            subject: 'test Email',
            text: req.body.message
        }
    }).then(
        response => {
            console.log(response)
        },
        reject => {
            console.log(reject)
        }
    )
};

module.exports = {
    createAlert
};
