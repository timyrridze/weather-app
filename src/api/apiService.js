import { cities } from "./cities"

export async function fetchWeatherData(city) {
  let data

  const requestURL = cities.find((element) => element.name === city).requestURL

  const response = await fetch(requestURL)

  data = await response.json()

  return data
}
