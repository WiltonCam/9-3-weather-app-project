const baseURL=('https://wttr.in')
const form = document.querySelector("form")
const userSearch = document.querySelector(".userSearch")

const currentWeather = document.querySelector('current-weather')
const todayWeather = document.querySelector('#today-weather')
const tomorrowWeather = document.querySelector('#tomorrow-weather')
const thirdDayWeather = document.querySelector('#third-day-weather')
const main = document.querySelector("main")
const ul = document.querySelector("#search-ul")
const p = document.querySelector(".chooseLocation")

form.addEventListener("submit", getApiData)

function getApiData(event){
    event.prventdefault()
const location = `${userSearch.value}`
const urlFormat = `${BASE_URL} ${location}?format=j1`
}

function getWeather(url, location){
    fetch(url)
        .then((response) => response.json())
        .then(result => {
    createCurrentWeather(result,location)        
        })
        .catch((error) => {
            createErrorMessage(error)
            function createErrorMessage(){}

        })
}       
function createCurrentWeather(result,location){
    appendCurrentWeather(result,location)
    getTodayWeather(result,location)
    getTomorrowWeather(result,location)
    getThirdDayWeather(result,location)
    getPreviousSearches(result,location)
    form.reset()
}

function appendCurrentWeather(result,location){
    const h1 = document.createElement(h1)
    h1.textContent = location
    const area = document.createElement('p')
    area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].value}`
    const region = document.createElement("p")
    region.innerHTML = `<strong>Region</strong> ${result.nearest_region[0].value}`
    const country = document.createElement("p")
    country.innerHTML = `<strong>Country</strong> ${result.nearest_country[0].value}`
    const current = document.createElement("p")
    current.innerHTML = `<strong>Country</strong> ${result.nearest_country[0].value}`
    currentWeather.append(h1, area, region, country, current)
}   

function getTodayWeather(result){
    const today = document.createElement('p');
    today.innerHTML = `<strong> Today </strong>
     <p> <strong> Average Temp : </strong> ${result.weather[0].avgtempF} F°</p>
     <p> <strong> Max Temp : </strong> ${result.weather[0].maxtempF} F°</p>
     <p> <strong> Min Temp : </strong>${result.weather[0].mintempF} F°</p>`
    todayWeather.append(today)
}

function getTodayWeather(result){
    const tomorrowWeather = document.createElement('p');
    today.innerHTML = `<strong> Today </strong>
     <p> <strong> Average Temp : </strong> ${result.weather[0].avgtempF} F°</p>
     <p> <strong> Max Temp : </strong> ${result.weather[0].maxtempF} F°</p>
     <p> <strong> Min Temp : </strong>${result.weather[0].mintempF} F°</p>`
    todayWeather.append(tomorrowWeather)
}

function getTodayWeather(result){
    const thirdDay = document.createElement('p');
    today.innerHTML = `<strong> Today </strong>
     <p> <strong> Average Temp : </strong> ${result.weather[0].avgtempF} F°</p>
     <p> <strong> Max Temp : </strong> ${result.weather[0].maxtempF} F°</p>
     <p> <strong> Min Temp : </strong>${result.weather[0].mintempF} F°</p>`
    todayWeather.append(thirdDay)
}