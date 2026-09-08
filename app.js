
const geocode = require("./geocode")
const forecast = require("./forecast")

const country = process.argv[2]

geocode(country, (error, data) => {

    if (error) {
        return console.log(error)
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {

        if (error) {
            return console.log(error)
        }

        console.log(`Temperature: ${forecastData.temperature}°C`)
        console.log(`Latitude: ${data.latitude}`)
        console.log(`Longitude: ${data.longitude}`)
    })
})