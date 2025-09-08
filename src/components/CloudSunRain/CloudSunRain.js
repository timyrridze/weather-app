import "./CloudSunRain.scss"
import { useEffect, useRef, memo, useContext } from "react"
import { WeatherContext } from "../../App"
import { WindParticles } from "../WindParticles/WindParticles"
import { weatherAnimation } from "../../animations/weatherAnimation"
import { calculateAnimationDuration } from "../../animations/calculateAnimationDuration"
import { cloudAnimation } from "../../animations/cloudAnimation/cloudAnimation"
import { sunAnimation } from "../../animations/sunAnimation/sunAnimation"
import { windAnimation } from "../../animations/windAnimation/windAnimation"
import { rainAnimation } from "../../animations/rainAnimation/rainAnimation"
import rain from "../../assets/images/rain-big.png"

export const CloudSunRain = memo( 

  function CloudSunRain({ width, animating = false, computeRainAnimationFallCoord }) {
    const weather = useContext(WeatherContext)
    
    const windParticlesNodeRef = useRef()
    const cloudRef = useRef()
    const sunRef = useRef()
    const rainRef = useRef()
    
    const heightCoefficient = 63 / 66.98000000007721
    const height = width * heightCoefficient

    const mainLayer = (
      <g id="layer1-50" transform="translate(-137.18711,-24.974114)">

        <WindParticles ref={windParticlesNodeRef} y={70} svgWidth={width} scaleToElement={".MainContent"} />

        <g id="cloud" ref={cloudRef}>
          <g id="g17-0" transform="matrix(-0.10787886,0,0,0.10805019,181.27083,66)" style={{ fill: "#000000" }}>
            <g id="g15-2">
              <g style={{ fill: "none", stroke: "#f3f3f3", strokeWidth: "8.5" }} id="g781" transform="matrix(-2.0000039,0,0,2.0000039,514.93207,-29.916667)">
                <path d="M 160,212 H 72 A 60,60 0 1 1 83.58838,93.11932 83.99846,83.99846 0 1 1 160,212 Z M 72,100 a 52,52 0 0 0 0,104 h 88 A 76,76 0 1 0 84,128 4,4 0 0 1 76,128 83.6458,83.6458 0 0 1 80.55322,100.70013 52.47853,52.47853 0 0 0 72,100 Z" />
              </g>
            </g>
          </g>
        </g>

        <g ref={sunRef} id="sun" transform="matrix(0.42640343,0,0,0.42640343,139.19969,83.483964)">
          <g id="sunCircles">

            <g id="g336">
              <g id="g334">
                <circle style={{ fill: "#fcdd66" }} cx="55.845001" cy="55.845001" r="55.845001" id="circle332" />
              </g>
            </g>

            <g id="g12946" style={{ display: "inline" }}>
              <g id="g342">
                <g id="g340">
                  <circle style={{ fill: "#fbd009" }} cx="55.845001" cy="55.845001" r="46.174" id="circle338" />
                </g>
              </g>
            </g>

          </g>

          <switch id="switch58" transform="matrix(0.90311124,0,0,0.9041026,10.8,10.4)">
            <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1" />
            <g iextraneous="self" id="sunbeams" fill="#fbd009ff">
              <path className="sunbeam" d="m 14.67,52.671 h -10 c -1.381,0 -2.5,-1.119 -2.5,-2.5 0,-1.381 1.119,-2.5 2.5,-2.5 h 10 c 1.381,0 2.5,1.119 2.5,2.5 0,1.381 -1.119,2.5 -2.5,2.5 z" id="path40" />
              <path className="sunbeam" d="m 94.08,52.671 h -10 c -1.381,0 -2.5,-1.119 -2.5,-2.5 0,-1.381 1.119,-2.5 2.5,-2.5 h 10 c 1.381,0 2.5,1.119 2.5,2.5 0,1.381 -1.119,2.5 -2.5,2.5 z" id="path42" />
              <path className="sunbeam" d="m 76.309,72.943 7.07,7.071 c 0.977,0.977 0.977,2.56 0,3.535 -0.977,0.977 -2.559,0.977 -3.535,0 l -7.071,-7.071 c -0.977,-0.976 -0.976,-2.559 0.001,-3.535 0.975,-0.976 2.558,-0.976 3.535,0 z" id="path44" />
              <path className="sunbeam" d="m 20.156,16.792 7.071,7.071 c 0.977,0.976 0.977,2.559 0.001,3.535 -0.977,0.977 -2.561,0.977 -3.537,0 l -7.07,-7.071 c -0.977,-0.977 -0.977,-2.559 0,-3.536 0.977,-0.977 2.559,-0.976 3.535,0.001 z" id="path46" />
              <path className="sunbeam" d="m 27.227,76.479 -7.07,7.071 c -0.977,0.976 -2.56,0.976 -3.535,0 -0.977,-0.977 -0.978,-2.56 -0.001,-3.536 l 7.071,-7.07 c 0.977,-0.977 2.559,-0.977 3.535,0 0.976,0.977 0.976,2.558 0,3.535 z" id="path48" />
              <path className="sunbeam" d="m 83.379,20.327 -7.071,7.071 c -0.977,0.977 -2.56,0.977 -3.536,0 -0.977,-0.977 -0.977,-2.56 0,-3.536 l 7.071,-7.071 c 0.977,-0.977 2.56,-0.976 3.536,0 0.975,0.977 0.976,2.56 0,3.536 z" id="path50" />
              <path className="sunbeam" d="m 52.5,84.876 v 10 c 0,1.381 -1.119,2.5 -2.5,2.5 -1.381,0 -2.5,-1.119 -2.5,-2.5 v -10 c 0,-1.381 1.119,-2.5 2.5,-2.5 1.381,0 2.5,1.119 2.5,2.5 z" id="path52" />
              <path className="sunbeam" d="m 52.5,5.466 v 10 c 0,1.381 -1.119,2.5 -2.5,2.5 -1.381,0 -2.5,-1.119 -2.5,-2.5 v -10 c 0,-1.381 1.119,-2.5 2.5,-2.5 1.381,0 2.5,1.119 2.5,2.5 z" id="path54" />
            </g>
          </switch>

        </g>

        <g ref={rainRef} id="rain" transform="translate(157.83568,29.499829)">
          <g style={{ fill: "none" }} transform="matrix(1.1024306,0,0,1.1024306,-1.8278875,78.242559)">
            <path className={"rainDrop"} d="M 15,0 V 12" stroke="#002bed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g style={{ fill: "none" }} transform="matrix(1.1024306,0,0,1.1024306,7.0496096,74.423924)">
            <path className={"rainDrop"} d="M 12.947393,3.4637749 V 19.060875" stroke="#002bed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g style={{ fill: "none" }} transform="matrix(1.1024306,0,0,1.1024306,11.401336,78.242495)">
            <path className={"rainDrop"} d="M 15,0 V 19.1942" stroke="#002bed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g style={{ fill: "none" }} transform="matrix(1.1024306,0,0,1.1024306,18.01592,78.242495)">
            <path className={"rainDrop"} d="M 15,0 V 22.7913" stroke="#002bed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <image href={rain} width={20} height={20} x={10} y={10} />
          </g>
        </g>
      </g>
    )

    useEffect(() => {

      if (animating === true && weather) {
        const windParticles = windParticlesNodeRef.current
        const cloud = cloudRef.current
        const sun = sunRef.current
        const rain = rainRef.current

        const windspeed = weather.currentConditions.windspeed
        const animationDuration = calculateAnimationDuration(windspeed)

        setTimeout(() => {
          weatherAnimation([rainAnimation(rain, computeRainAnimationFallCoord(), width)])
        }, 1000)

      }

    }, [weather])

    return (
      <>
        <svg viewBox={`0 0 66.98000000007721 61.3`} width={`${width}`} height={`${height}`} overflow="visible" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnssvg="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          
          <g id="layer1" transform="translate(-88.48704,-56.114233)">
            <g id="layer1-5" transform="translate(81.158096,17.24602)">
              <g id="layer1-8" transform="translate(17.112861,-8.2028569)">
                <g style={{ fill: "none" }} id="g1360" transform="matrix(1.1024306,0,0,1.1024306,11.401336,78.242495)" />

                {mainLayer}

              </g>
            </g>
          </g>
        </svg>
      </>
    )

  }

)