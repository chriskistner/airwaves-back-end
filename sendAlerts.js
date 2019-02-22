const db = require('./db');
require('dotenv').load();
const mailGunKey = process.env.MAILGUN_API_KEY;
const mailGunDomain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: mailGunKey, domain: mailGunDomain});

function getAlerts () {
    return db('alerts')
    .join('users', 'users.user_id', 'alerts.user_id')
};

function sendEmails(email, user ) {
    const data = {
        from: 'airways.com <me@samples.mailgun.org>',
        to: email,
        subject: `${user} Airways.com test Message`,
        text: "Test Message"
      };
       
      return mailgun.messages().send(data)
      .catch(result => {
          console.log(result)
      })
};

getAlerts()
.then(result => {
    const promises = result.map(alert => sendEmails(alert.email, alert.user))
    Promise.all(promises)
    .then(result => {
        console.log(result)
        process.exit(0)
    }).catch(console.error)
});

