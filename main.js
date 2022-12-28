import "./style.css"
import { getWeather } from "./weather"

getWeather(62.89, 27.68, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    data => {
    console.log(data)
})