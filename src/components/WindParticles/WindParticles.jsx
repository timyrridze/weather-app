import { useState, memo, forwardRef, useMemo, useEffect, useLayoutEffect } from "react"

function getStrokeWidth(strokeWidthInPx, svgWidth, devicePixelRatio) {
  const strokeWidthUnit = svgWidth * 0.06

  return strokeWidthInPx / (strokeWidthUnit * devicePixelRatio)
}

const fixVisibility = navigator.userAgent.includes("Firefox") ? (await import("./firefox optimization/fixVisibility.js")).default : () => null

const getAdditionToScaleFactor = navigator.userAgent.includes("Firefox") ? (await import("./firefox optimization/getAdditionToScaleFactor.js")).default : () => 0

  
export const WindParticles = memo(forwardRef(

  function WindParticles({ y, svgWidth, scaleToElement }, ref) { 
    const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio)

    let windParticlesNodeRef = ref
    
    const strokeWidthInPx = 4
    const quantity = 5
    const gapBetweenParticles = 10

    const windParticles = useMemo(() => {
      const arr = []

      for (let i = 0; i < quantity; i++) {
        arr[i] = <path key={y + i * gapBetweenParticles} className="windParticle" d={`m 107.3 ${y + i * gapBetweenParticles} l 100 0`}></path>
      }

      return arr
    }, [])

    useLayoutEffect(() => {  
      fixVisibility(windParticlesNodeRef.current, strokeWidthInPx)
    }, [])

    useEffect(() => {      
      
      let timer = setTimeout(() => {
        const windParticlesWidth = () => windParticlesNodeRef.current.getBoundingClientRect().width
        const windParticlesX = () => windParticlesNodeRef.current.getBoundingClientRect().x

        const newWindParticlesWidth = document.querySelector(scaleToElement).getBoundingClientRect().width

        windParticlesNodeRef.current.style.transform = "none"

        // Изменение ширины windParticles до ширины scaleToElement
        const newXScaleFactor = ((newWindParticlesWidth) / windParticlesWidth() + getAdditionToScaleFactor(svgWidth))
        windParticlesNodeRef.current.style.transform = `scale(${newXScaleFactor}, 1) translate(0px, 0)`

        // Горизонтальный центр windParticles должен совпадать с горизонтальным центром scaleToElement
        const xTranslation = (-windParticlesX() - (windParticlesWidth() - newWindParticlesWidth) / 2) / (svgWidth * 0.014933349609375 * newXScaleFactor)
        windParticlesNodeRef.current.style.transform = `scale(${newXScaleFactor}, 1) translate(${xTranslation}px)`
      }, 455)

      return () => {
        clearTimeout(timer)
      }

    }, [devicePixelRatio])

    window.onresize = () => {
      setDevicePixelRatio(window.devicePixelRatio)
    }

    return (
      <g ref={ref} id="windParticles" strokeWidth={getStrokeWidth(strokeWidthInPx, svgWidth, devicePixelRatio)}>
        {windParticles}
      </g>
    )
  }
 )
)