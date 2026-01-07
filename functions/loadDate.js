import { day , month } from "../constants/constants.js"

const date = document.querySelector('#date')

export const loadDate = () =>{
    const dateObj = new Date()
    date.textContent = `${day[dateObj.getDay()]}, ${month[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
}