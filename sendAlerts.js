const db = require('./db');
require('dotenv').load();
const locations = require('./emailtemplates/locationAlertEmail')
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: mailGunKey, domain: mailGunDomain});

getAlerts = () => {
    return db('alerts')
    .join('users', 'users.user_id', 'alerts.user_id')
};

sendEmails = async (email, user, type, lat, long, polyline, alert ) => {
    let message = ''
    if (type=== 'location') {
        message = await locations.locationAlert(user, alert, lat, long)
    } else {message= 'Route'}
    const data = {
        from: 'airways.com <me@samples.mailgun.org>',
        to: email,
        subject: `${user} Airways.com test Message`,
        html:  `${message}`
      };
       
      return mailgun.messages().send(data)
      .catch(result => {
          console.log(result)
      })
};

getAlerts()
.then(result => {
    const promises = result.map(alert => sendEmails(alert.email, alert.user_name, alert.type, alert.latitude, alert.longitude, alert.polyline, alert.name))
    Promise.all(promises)
    .then(result => {
        console.log(result)
        process.exit(0)
    }).catch(console.error)
});

