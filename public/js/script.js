const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const weatherCard = document.querySelector(".weather-card")

const locationName = document.querySelector("#location-name")
const temperature = document.querySelector("#temperature")
const latitude = document.querySelector("#latitude")
const longitude = document.querySelector("#longitude")
const weatherStatus = document.querySelector(".weather-status")
const errorMessage = document.querySelector(".error-message")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const address = search.value

    errorMessage.style.display = "none"

    fetch(`/weather?address=${encodeURIComponent(address)}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data)

            if (data.error) {
                errorMessage.textContent = data.error
                errorMessage.style.display = "block"
                return
            }

            locationName.textContent = data.country
            temperature.textContent = `${data.temperature}°C`
            latitude.textContent = data.latitude
            longitude.textContent = data.longitude
            weatherCard.style.display = "block"
        })
        .catch((error) => {
            errorMessage.textContent = "Something went wrong. Please try again."
            errorMessage.style.display = "block"
        })
})