import "./MainWeather.scss"
import {CloudSunRain} from "../CloudSunRain/CloudSunRain"


export function MainWeather() {
  const computeRainAnimationCoord = () => {
    return window.innerHeight
  }

  return (

    <div className="MainWeather">

      <CloudSunRain width={257} animating={true} computeRainAnimationFallCoord={computeRainAnimationCoord}/>

    </div>  
    
  )
}