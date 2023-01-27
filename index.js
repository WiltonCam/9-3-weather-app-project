const BASE_URL = `https://wttr.in`

const searchResult = document.querySelector(".searchResults")
const form = document.querySelector("form");
const currentWeatherArticle = document.querySelector("#current-weather")
const todayWeatherArticle = document.querySelector("#today")
const tomorrowWeatherArticle = document.querySelector("#tomorrow")
const dayAfterWeatherArticle = document.querySelector("#day-after")
const main = document.querySelector("main")
const ul = document.querySelector("#search-ul")
const p = document.querySelector(".chooseLocation")
let formattedUrl
form.addEventListener("submit", getCurrentApi)

function getCurrentApi(event) {
    event.preventDefault();
    const location = `${searchResult.value}`
     formattedUrl = `${BASE_URL}/${location}?format=j1`
    getWeatherAppData(formattedUrl, location)
    form.reset()
}

function getWeatherAppData(url, location) {
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            
            console.log("I'm in Fetch")
            createCurrentWeather(result, location);
            
        })
        .catch((error) => {
            
           createErrorMessage(error)
            
           function createErrorMessage(){}
        });
}
function createCurrentWeather(result, location) {
    console.log(result, location)
    appendCurrentWeatherResult(result, location)
    getTodayWeatherArticle(result, location)
    getTomorrowWeatherArticle(result, location)
    getDayAfterWeatherArticle(result, location)
    getPreviousSearches(result, location)
}
function appendCurrentWeatherResult(result, location) {
    currentWeatherArticle.textContent = ""
    const h2 = document.createElement('h2');
    h2.textContent = location
    const area = document.createElement("p");
    if (`${result.nearest_area[0].areaName[0].value}` === location){
        area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].areaName[0].value}`
    } else {
        area.innerHTML = `<strong>Nearest Area:</strong> ${result.nearest_area[0].areaName[0].value}`
    } 
    
    const region = document.createElement("p")
    region.innerHTML = `<strong>Region:</strong> ${result.nearest_area[0].region[0].value} `
    const country = document.createElement("p")
    country.innerHTML = `<strong>Country:</strong> ${result.nearest_area[0].country[0].value}`
    const current = document.createElement("p")
    current.innerHTML = `<strong>Current:</strong> Feels Like ${result.current_condition[0].FeelsLikeF}°F`
    currentWeatherArticle.append(h2, area, region, country, current)
    
}
function getTodayWeatherArticle(result) {
    todayWeatherArticle.textContent = ""
    const today = document.createElement('p');
    today.innerHTML = `<strong>Today</strong> 
    <p> <strong> Average Temperature: </strong> ${result.weather[0].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[0].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[0].mintempF}°F </p>`
    todayWeatherArticle.append(today) 
}

function getTomorrowWeatherArticle(result) {
    tomorrowWeatherArticle.textContent = " "
    const tomorrow = document.createElement("p")
    tomorrow.innerHTML = `<strong>Tomorrow</strong> 
    <p> <strong> Average Temperature: </strong> ${result.weather[1].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[1].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[1].mintempF}°F </p>`
    tomorrowWeatherArticle.append(tomorrow)
}

function getDayAfterWeatherArticle(result) {
    dayAfterWeatherArticle.textContent = " "
    const dayAfter = document.createElement("p")
    dayAfter.innerHTML = `<strong>Day After Tomorrow</strong>
    <p> <strong> Average Temperature: </strong> ${result.weather[2].avgtempF}°F</p> 
    <p> <strong> Max Temperature: </strong> ${result.weather[2].maxtempF}°F </p>
    <p> <strong> Min Temperature: </strong> ${result.weather[2].mintempF}°F </p>`
    dayAfterWeatherArticle.append(dayAfter)
   
}

function getPreviousSearches(result, location) {
    console.log("test")
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("href", "#")
    a.setAttribute("name", formattedUrl)
    a.textContent = location 
    const pElement = document.createElement("p")
    pElement.textContent = `- ${result.current_condition[0].FeelsLikeF}°F`
     ul.append(li)
    li.append(a)
a.after(pElement)
const search = document.querySelector("#no-previous-search")
    search.remove()
    a.addEventListener("click", (event)=>{
        getWeatherAppData(`${event.target.name}`, location)
    })

};