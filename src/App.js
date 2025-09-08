import './App.scss'
import React, {createContext, useState} from "react"
import { MainContent } from './components/MainContent/MainContent'
import { ExtraContent } from './components/ExtraContent/ExtraContent'

export const WeatherContext = createContext(null)

// New York, Berlin...
export const defaultCity = "New York"

function App() {
  const [weather, setWeather] = useState()

  return (

    <WeatherContext.Provider value={weather}>
      <MainContent setWeather={setWeather} />
      <ExtraContent />
    </WeatherContext.Provider>
    
  )

}

export default App