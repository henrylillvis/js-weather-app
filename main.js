import "./style.css"
import { getWeather } from "./weather"
import { getLocationName } from "./location"
import { ICON_MAP } from "./iconmap"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
// 62.89, 27.68 Kuopio
function positionSuccess({ coords }) {
    getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then(renderWeather)
        .catch(e => {
            console.error(e)
            alert("Virhe sään hakemisessa")
        })
    getLocationName(
        coords.latitude,
        coords.longitude)
        .then(locationName => {
            console.log(locationName);
            setValue("current-location", locationName)
        })
        .catch(e => console.error(e));
}

function positionError() {
    alert("Virhe sijainnin hakemisessa.")
}


function renderWeather(current, daily, hourly) {
    //console.log(current)
    //console.log(current.daily)
    renderCurrentWeather(current)
    renderDailyWeather(current)
    renderHourlyWeather(current)
    document.body.classList.remove("blurred")
}
function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}
function getIconURL(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}


const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    //console.log(current)
    //document.querySelector("[data-current-temp]").textContent = current.current.currentTemp
    currentIcon.src = getIconURL(current.current.iconCode)
    setValue("current-temp", current.current.currentTemp)
    setValue("current-high", current.current.highTemp)
    setValue("current-low", current.current.lowTemp)
    setValue("current-fl-high", current.current.highFeelsLike)
    setValue("current-fl-low", current.current.lowFeelsLike)
    setValue("current-wind", current.current.windSpeed)
    setValue("current-precip", current.current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {  weekday: "long" })
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")

function renderDailyWeather(current) {
    dailySection.innerHTML = ""
    console.log(current.daily)
    current.daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, { parent: element })
        setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element })
        element.querySelector("[data-icon]").src = getIconURL(day.iconCode)
        dailySection.append(element)
    })
}
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })
const DAY_HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {  dateStyle: "short"  })

const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(current) {
    hourlySection.innerHTML = ""
    console.log(current.hourly)
    current.hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        setValue("temp", hour.temp, { parent: element })
        setValue("fl-temp", hour.feelsLike, { parent: element })
        setValue("wind", hour.windSpeed, { parent: element })
        setValue("precip", hour.precip, { parent: element })
        setValue("day", DAY_HOUR_FORMATTER.format(hour.timestamp), { parent: element })
        setValue("time", HOUR_FORMATTER.format(hour.timestamp)+":00", { parent: element })
        element.querySelector("[data-icon]").src = getIconURL(hour.iconCode)
        hourlySection.append(element)
    })
}


