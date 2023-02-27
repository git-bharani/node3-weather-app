const request = require('request')

// Fetching the latitude and longitude data from geocode API
const get_geocode = (address, callback) => {
  let result = {}
    const url = encodeURI("https://api.geoapify.com/v1/geocode/search?text="+address+"&format=json&apiKey=e5a81b6cfca645429820ad73b277d472");
    request({url, json: true}, (error, {body}) => {
        if(error){
          callback('Unable to access the geocode API. Check your network!', undefined);
        }
        else if(body.error) {
          callback('Unable to coordinate with the geocode API', undefined)
        }
        else if(body.results.length === 0){
          callback("Can't get the weather with the given location. Check and try again!", undefined)
        }
        else{
          const {lat, lon} = body.results[0];
          result = {lat, lon}
          callback(undefined, result);
        }
    });
  }

  module.exports = {
    get_geocode: get_geocode
  }