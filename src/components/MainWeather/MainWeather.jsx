import "./MainWeather.scss"
import {CloudSunRain} from "../CloudSunRain/CloudSunRain"


export function MainWeather() {
  const computeRainAnimationCoord = () => {
    return window.innerHeight
  }

  return (

    <div className="MainWeather">

      <CloudSunRain width={330} animating={true} computeRainAnimationFallCoord={computeRainAnimationCoord}/>

    </div>  
    
  )
}