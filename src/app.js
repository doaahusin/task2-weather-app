const express = require("express")
const app = express()

const port = process.env.PORT || 3000

const geocode = require("../geocode")
const forecast = require("../forecast")

const path = require("path")

const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../views"))


// const geocode = require("../geocode")
// const forecast = require("../forecast")

// const country = process.argv[2]

// geocode(country, (error, data) => {

//     if (error) {
//         return console.log(error)
//     }

//     forecast(data.latitude, data.longitude, (error, forecastData) => {

//         if (error) {
//             return console.log(error)
//         }

//         console.log(`Temperature: ${forecastData.temperature}°C`)
//         console.log(`Latitude: ${data.latitude}`)
//         console.log(`Longitude: ${data.longitude}`)
//     })
// })

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/weather", (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, data) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                country: req.query.address,
                temperature: forecastData.temperature,
                latitude: data.latitude,
                longitude: data.longitude
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})