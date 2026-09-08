const request = require("request")

const geocode = (country, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=d8c28f6cb3084cfe805101149260209&q=${country}`

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude: response.body.location.lon
            })
        }
    })
}

module.exports = geocode