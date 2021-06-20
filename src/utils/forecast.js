// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ffa24c80c681d2de6b16d1eac1fde6be&query='+ longitude +',' + latitude
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Cannot connect to weather service')
        }
        else if(body.error){
            callback('Cannot find location')
        }
        else{
            callback(undefined, body.current.weather_descriptions[0])
        }
    })
}

  module.exports = forecast