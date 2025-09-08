import React, { useRef, useState, useEffect, memo } from "react"
import "./SelectCity.scss"
import { defaultCity } from "../../App"
import { cities } from "../../api/cities"
import {fetchWeatherData} from "../../api/apiService"

function changeCity(target, setCity) {
  if (target.classList.contains("cities")) return

  const clickedCity = target.textContent

  setCity(clickedCity)
}

function toggleCities(citiesElement, animationstart, selectedCityClick) {

  function firefoxOptimization() {
    const clickTime = performance.now()

    if (clickTime - animationstart >= 180) {
      const previousOnAnimationEnd = citiesElement.onanimationend

      citiesElement.onanimationend = function () {
        previousOnAnimationEnd.call(this)
        this.dispatchEvent(selectedCityClick)
      }

      return true

    }

    return false
  }

  function showCities(citiesElement) {
    citiesElement.classList.remove("hidden")
    citiesElement.classList.add("animation-zoom-in")

    citiesElement.onanimationend = function () {
      this.classList.remove("animation-zoom-in")
    }
  }

  function hideCities(citiesElement) {
    citiesElement.classList.add("animation-zoom-out")

    citiesElement.onanimationend = function() {
      this.classList.remove("animation-zoom-out")
      this.classList.add("hidden")
    }
  }

  const citiesBeingAnimated = citiesElement.className.includes("animation")

  switch (citiesBeingAnimated) {

    case false:

      if (citiesElement.classList.contains("hidden")) {
        showCities(citiesElement)
      } else {
        hideCities(citiesElement)
      }

      break;

    case true:

      if (navigator.userAgent.includes("Firefox")) {
        const done = firefoxOptimization()

        if(done === true) return
      }

      if (citiesElement.className.includes("zoom-in")) {

        citiesElement.classList.remove("animation-zoom-in")
        hideCities(citiesElement)

      } else {

        citiesElement.classList.remove("animation-zoom-out")
        showCities(citiesElement)

      }

      break;
  }

} 


function SelectedCity({city, citiesElementRef}) {
  let clickTime = null

  const selectedCityClick = new Event("selectedCityClick")

  function handleClick() {

    toggleCities(citiesElementRef.current, clickTime, selectedCityClick)

    clickTime = performance.now()

  }

  useEffect(() => {
    citiesElementRef.current.addEventListener(selectedCityClick.type, handleClick)
  }, [])

  return (
    <div className="selectedCityWrapper" onClick={() => {
      citiesElementRef.current.dispatchEvent(selectedCityClick)
    }}>

      <span className="selectedCity">
        {city}
      </span>

      <div className="selectedCityBackground"></div>

    </div>
  )
}

function Cities({ setCity, citiesElementRef }) {
  function handleClick(event) {

    changeCity(event.target, setCity)
    toggleCities(citiesElementRef.current)

  }

  return (
    <ul className="cities hidden" ref={citiesElementRef} onClick={handleClick}>
      {cities.map((city, index) => <li className="city" key={index}>{city.name}</li>)}
    </ul>
  )
}

export const SelectCity = memo(

function SelectCity({ setWeather }) {
  const [city, setCity] = useState(defaultCity)

  const citiesElementRef = useRef()

  useEffect(() => {

    ;(async () => {
      const weatherData = await fetchWeatherData(city)

      setWeather(weatherData)
    })()

  }, [city, setWeather])

  return (
 
    <div className="SelectCity">

      <SelectedCity city={city} citiesElementRef={citiesElementRef} />
      
      <Cities setCity={setCity} citiesElementRef={citiesElementRef} />

    </div>

  )
}

)

