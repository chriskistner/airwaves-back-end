require('dotenv').config({path: '../.env'});
const axios = require('axios');
const breezeApi = process.env.BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.BREEZE_O_METER_POLLEN_URL;
// '47.2932583', '-122.1947061'

setDisplayedConditions = (lat, long) => {
    return axios.get(`${conditionsUrl}lat=${lat}&lon=${long}&key=${breezeApi}&features=breezometer_aqi,local_aqi,pollutants_concentrations,pollutants_aqi_information`,{})
};

setDisplayedPollen = (lat, long) => {
    return axios.get(`${pollenUrl}lat=${lat}&lon=${long}&days=1&key=${breezeApi}`,{})
};

fetchAirQualityData = async (lat, long) => {
    try {
        const conditions = await setDisplayedConditions(lat, long);
        const pollen = await setDisplayedPollen(lat, long);
        return {pollen: pollen.data.data, air: conditions.data.data} 
    }catch(err) {
        console.log(err)
    }
};

locationAlert = async (user, loc, lat, long) => {
    const airData = await fetchAirQualityData(lat, long)
    console.log(airData.pollen[0].types)
    return `
        <h1>Good Morning ${user}</h1>
        <p>Here is your scheduled Airways.com Air Quality report.</p>
        <hr />
        <h3>Today's Air Conditions</h3>
        <p>Today at Location ${loc} you have <b>${airData.air.indexes.usa_epa.category}</b> with a BPI of <b>${airData.air.indexes.usa_epa.aqi_display}</b></p>
        <p><b>Dominant Pollutant:</b> ${airData.air.indexes.usa_epa.dominant_pollutant}</p>
        <hr />
        <h3>Today's Pollen Conditions</h3>
        <p>Today at Location ${loc}..</p>
        <p><b>Tree Pollen:</b> ${airData.pollen[0].types.tree.index.category || 'Not in Season'} ${airData.pollen[0].types.tree.index.value || ''}</p>
        <p><b>Grass Pollen:</b> ${airData.pollen[0].types.grass.index.category || 'Not in Season'} ${airData.pollen[0].types.grass.index.value || ''}</p>

    `
};

module.exports= {
    locationAlert
}
