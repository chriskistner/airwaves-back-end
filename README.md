# airways-back-end 2/28/2019
back-end for Galvanize capstone project, Airways

# Description
Airways is a site dedicated to helping asthmatics and those with allergies navigate daily life better by letting them know what they're breathing. Major differences in air quality between a person's home and their job can seriously impact an asthmatics day, especially if they live an active lifestyle. Should I bike to work or drive? Do I need to take my allergy medication this morning even though it makes me drowsy? Airways allows such individuals to get up to the minute air and pollen data about any location in the USA they choose. User's can also create routes for their daily commute, trips, and journey's around town and then elect to have email alerts sent to them with daily reports on air quality. Airways let's you breath easy.

#Operational Requirements
Airways makes use of several third-party APIs to operate. User's will need to sign up and acquire API Keys for the follwing applications before Airways can be used:

1. Breeze-O-Meter
2. Google Maps
3. Mailgun

Key's along with the URL's for the Get requests must be placed in a .env file created in the primary project directory. The URL and API variable names are listed below however you will need to add your own keys and Mailgun Domain.

SECRET='Whatever kind of SECRET phrase you want to use'

GOOGLE_GEOCODE_URL=https://maps.googleapis.com/maps/api/geocode/json?address=
GOOGLE_API_KEY='Your own key goes here'

MAILGUN_URL=https://api.mailgun.net/v3/sandbox1889ac6752204b1cb66860e34c02bdbf.mailgun.org
MAILGUN_DOMAIN='Your own Mailgun Domain goes here'
MAILGUN_API_KEY='Your own key goes here'

BREEZE_O_METER_API_KEY='Your own key goes here'
BREEZE_O_METER_CURRENT_CONDITIONS_URL=https://api.breezometer.com/air-quality/v2/current-conditions?
BREEZE_O_METER_POLLEN_URL=https://api.breezometer.com/pollen/v2/forecast/daily?

#API Usage Warning
Breeze-O-Meter is not free to access. As of the day this README was drafted you can sign up for a 15-day free trial and get a key that will enable all of Airways functions. However trial keys only allow you to make 1000 calls a day to the API so extensive use isn't recomended. 

By default Mailgun email functionality is also commented out and disabled. This is  because unless you want to pay for and register your own domain, you can only send emails to your user account.


# Installation
1. Clone this repo
2. Run `npm install`
3. Create a PostgreSQL database name airways_db_dev
4. Run `npm run knex migrate:latest`
5. Run `npm run knex seed: run` should you want some seed data
3. Run `npm run dev`