const request = require('request');

// Fetch the temperature with latitude and langitude using weather API. 
const get_forecast = (lat, lon, callback) => {
    const url = encodeURI('https://api.weatherapi.com/v1/current.json?key=34bdbbe74e7f4a22918122824230802&q='+lat+','+lon);
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to access the forecast API. Check your network!', undefined)
        }else if (body.error){
            callback('Unable to coordinate with the forecast API', undefined)
        }else{
            const {name, region, country} = body.location
            const forecast_data = {location: name+", "+region+", "+country, temperature: body.current.temp_c}
            callback(undefined, forecast_data)
        }
    })
}

module.exports = {
    get_forecast : get_forecast
}