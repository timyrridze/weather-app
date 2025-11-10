import { getUserUnitInPx } from "../../../utils/getUserUnitInPx"
import "./rainAnimation.css"

export function rainAnimation(rain: SVGGElement, fallCoord: number) {

  return async (resolve: (value: void) => void) => {
    let lastAnimatedElement: (Object & SVGElement) | null = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0]
      const raindropParts = rain.children[i].children[1]

      if (!(raindrop instanceof SVGPathElement)) {
        throw("raindrop expected to be of type SVGPathElement")
      }

      if (!(raindropParts instanceof SVGGElement)) {
        throw("raindropParts expected to be of type SVGGElement")
      }

      fallAnimation(raindrop, fallCoord)
      moveRaindropPartsTo(raindropParts, fallCoord)

      raindrop.onanimationend = () => {
        breakOffAnimation(raindropParts)
      }

      if (i != 0) await sleep(200)

      lastAnimatedElement = raindropParts
    }

    if (lastAnimatedElement) lastAnimatedElement.onanimationend = () => resolve()
  }
  
}

function fallAnimation<T extends SVGGraphicsElement>(raindrop: T, fallCoord: number) {
  const raindropCoord = raindrop.getBoundingClientRect().y
  const raindropHeight = raindrop.getBoundingClientRect().height

  const userUnit: number = getUserUnitInPx(raindrop)

  raindrop.style.setProperty('--translate-y', `${(fallCoord - (raindropCoord + raindropHeight)) / userUnit + getYTranslateCorrection()}px`)
  raindrop.classList.add("animation-fall")
}

function breakOffAnimation(raindropParts: SVGGElement) {

  for (let i = 0; i < raindropParts.children.length; i++) {
    const raindropPart = raindropParts.children[i]

    if (!(raindropPart instanceof SVGPathElement)) {
      throw ("raindropPart expected to be of type SVGPathElement")
    }

    raindropPart.style.setProperty("--stroke-dashoffset", `${raindropPart.getTotalLength()}px`)
  }

  raindropParts.classList.add("animation-break-off")
}

function moveRaindropPartsTo(raindropParts: SVGGElement, y: number) {
  let userUnit: number = getUserUnitInPx(raindropParts)

  const raindropPartsBoundingClientRect = raindropParts.getBoundingClientRect()
  const yAxisDistance: number = y - raindropPartsBoundingClientRect.y - raindropPartsBoundingClientRect.height

  raindropParts.style.transform = `translate(0, ${yAxisDistance / userUnit + getYTranslateCorrection()}px)`
}

function getYTranslateCorrection() {
  return navigator.userAgent.includes("Firefox") ? 0.5 : -1
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
