const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=d8c28f6cb3084cfe805101149260209&q=${latitude},${longitude}`

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error) {
            callback("Unable to find weather data", undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temp_c
            })
        }
    })
}

module.exports = forecast