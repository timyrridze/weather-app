import "./MainContent.scss"
import { MainWeather } from '../MainWeather/MainWeather'
import { SelectCity } from "../SelectCity/SelectCity"


export function MainContent({ setWeather }) {
  
  return (
    <div className="MainContent container">

      <SelectCity setWeather={setWeather} />
      <MainWeather />

    </div>
  )
}