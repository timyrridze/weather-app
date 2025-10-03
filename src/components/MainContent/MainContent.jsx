import "./MainContent.scss"
import { MainWeather } from '../MainWeather/MainWeather.jsx'
import { SelectCity } from "../SelectCity/SelectCity.jsx"


export function MainContent({ setWeather }) {
  
  return (
    <div className="MainContent container">

      <SelectCity setWeather={setWeather} />
      <MainWeather />

    </div>
  )
}