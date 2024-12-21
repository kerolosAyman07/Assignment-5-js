// Search 
const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")

//  Current Day 
const currentDayName = document.querySelector("#currentDayName")
const currentDayNumber = document.querySelector("#currentDayNumber")
const currentDayMonth = document.querySelector("#currentDayMonth")
const currentCityName = document.querySelector("#currentCityName")
const currentTempMax = document.querySelector("#currentTempMax")
const currentTempImg = document.querySelector("#currentTempImg")
const currentTempStatus = document.querySelector("#currentTempStatus")
const currentRainNumber = document.querySelector("#currentRainNumber")
const currentwindNumber = document.querySelector("#currentwindNumber")
const currentWindDirction = document.querySelector("#currentWindDirction")

//  Next Days
const NextDayName = document.querySelectorAll("#NextDayName")
const NextDayImg = document.querySelectorAll("#NextDayImg")
const NextTempMax = document.querySelectorAll("#NextTempMax")
const NextTempMin = document.querySelectorAll("#NextTempMin")
const NextTempStatus = document.querySelectorAll("#NextTempStatus")


async function APIData(city) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6cce71b829f442cf93934053242112&q=${city}&days=3`)
    let weatherRec = await weather.json()
    return weatherRec
}

function currentDayData(currentData){
    let currentDay = new Date ()
    currentDayName.innerHTML = currentDay.toLocaleDateString("en-us" , {weekday : "long"})
    currentDayMonth.innerHTML = currentDay.getDate()
    currentDayNumber.innerHTML = currentDay.toLocaleDateString("en-us" , {month : "long"})
    currentCityName.innerHTML = currentData.location.name
    currentTempMax.innerHTML = currentData.current.temp_c
    currentTempImg.setAttribute("src" , currentData.current.condition.icon)
    currentTempStatus.innerHTML = currentData.current.condition.text
    currentRainNumber.innerHTML = currentData.current.humidity + "%"
    currentwindNumber.innerHTML = currentData.current.wind_kph + "km/h"
    currentWindDirction.innerHTML = currentData.current.wind_dir
}

function nextDaysData(nextDaysData){
    for (let i = 0 ; i < 2 ; i++) {
        let nextDays = new Date (nextDaysData.forecast.forecastday[i+1].date)
        NextDayName[i].innerHTML = nextDays.toLocaleDateString("en-us" , {weekday : "long"})
        NextDayImg[i].setAttribute("src" , nextDaysData.forecast.forecastday[i+1].day.condition.icon)
        NextTempMax[i].innerHTML = nextDaysData.forecast.forecastday[i+1].day.maxtemp_c
        NextTempMin[i].innerHTML = nextDaysData.forecast.forecastday[i+1].day.mintemp_c
        NextTempStatus[i].innerHTML = nextDaysData.forecast.forecastday[i+1].day.condition.text
    }
}

searchBtn.addEventListener("click" , function(){
    startTheApp(searchInput.value)
})

async function startTheApp(city = "Cairo"){
    let weatherData = await APIData(city)
    currentDayData(weatherData)
    nextDaysData(weatherData)
}
startTheApp()
