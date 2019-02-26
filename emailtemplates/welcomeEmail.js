
welcomeEmail = (user, address, city, state) => {
    return `
        <h1>Welcome to Airways ${user}</h1>
        <p>We're excited that you've joined us, and we hope our site and it's information will help you breathe easier.</p>
        <hr />
        <h3>Here is your default user information</h3>
        <p><b>Home Address:</b> ${address}</p>
        <p><b>Home City:</b> ${city}</p>
        <p><b>Home State:</b> ${state}</p>
        <hr />
        <p>You can update your profile if you move anytime, at this point you should head over to the site and begin
        saving locations and routes so you can stay up to date on the air quality where ever your daily routine takes you.</p>
    `
};

module.exports = {
    welcomeEmail
}