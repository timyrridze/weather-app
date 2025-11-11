import "./MainWeather.scss"
import {CloudSunRain} from "../CloudSunRain/CloudSunRain.jsx"


export function MainWeather() {

  const getRainAnimationCoord = () => {
    return window.innerHeight
  }

  return (

    <div className="MainWeather">

      <CloudSunRain width={235} animating={true} getRainAnimationFallCoord={getRainAnimationCoord}/>

    </div>  
    
  )
}