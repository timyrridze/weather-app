import { getUserUnitInPx } from "../../../utils/getUserUnitInPx"
import "./rainAnimation.css"

interface FallCoord {
  value: number,
  correction: number
}

const ANIMATION_ITERATION_DELAY: number = 200

export function rainAnimation(rain: SVGGElement, fallCoordValue: number) {

  const fallCoord: FallCoord = {
    value: fallCoordValue,
    correction: navigator.userAgent.includes("Firefox") ? 0.5 : -1
  }

  return async (resolve: (value: void) => void) => {
    let lastRaindropParts: (Object & SVGElement) | null = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0]
      const raindropParts = rain.children[i].children[1]

      if (!(raindrop instanceof SVGPathElement)) {
        throw("raindrop expected to be of type SVGPathElement")
      }

      if (!(raindropParts instanceof SVGGElement)) {
        throw("raindropParts expected to be of type SVGGElement")
      }

      fallAnimation(raindrop, fallCoord).then(() => {
        // moveToFallCoord(raindrop, fallCoord)
        moveToFallCoord(raindropParts, fallCoord)
        breakOffAnimation(raindropParts)
      })

      if (i != 0) await wait(ANIMATION_ITERATION_DELAY)

      lastRaindropParts = raindropParts
    }

    // if (lastRaindropParts) lastRaindropParts.onanimationend = () => 
  }
  
}

async function fallAnimation<T extends SVGGraphicsElement>(raindrop: T, fallCoord: FallCoord) {
  const raindropCoord: number = raindrop.getBoundingClientRect().y
  const raindropHeight: number = raindrop.getBoundingClientRect().height

  const userUnit: number = getUserUnitInPx(raindrop)

  raindrop.style.setProperty('--translate-y', `${(fallCoord.value - (raindropCoord + raindropHeight)) / userUnit + fallCoord.correction}px`)
  raindrop.classList.add("animation-fall")

  return await new Promise((resolve) => {

    raindrop.onanimationend = () => {
      raindrop.classList.remove("animation-fall")
      raindrop.style.removeProperty("--translate-y")

      resolve(null)
    }

  })
}

function breakOffAnimation(raindropParts: SVGGElement) {

  for (let i = 0; i < raindropParts.children.length; i++) {
    const raindropPart = raindropParts.children[i]

    if (!(raindropPart instanceof SVGPathElement)) {
      throw ("raindropPart expected to be of type SVGPathElement")
    }

    raindropPart.style.setProperty("--stroke-dashoffset", `${raindropPart.getTotalLength()}px`)

    raindropPart.onanimationend = () => {
      raindropPart.style.removeProperty("--stroke-dashoffset")
      raindropParts.classList.remove("animation-break-off")
    }
  }

  raindropParts.classList.add("animation-break-off")

}

function fadeInAnimation(rain: SVGGElement) {
  for (let i = rain.children.length - 1; i >= 0; i--) {
    const raindrop = rain.children[i].children[0] 

    // raindrop
  }
}

function moveToFallCoord(Element: SVGGElement, fallCoord: FallCoord) {
  let userUnit: number = getUserUnitInPx(Element)

  const raindropPartsBoundingClientRect = Element.getBoundingClientRect()
  const yAxisDistance: number = fallCoord.value - raindropPartsBoundingClientRect.y - raindropPartsBoundingClientRect.height

  Element.style.transform = `translateY(${yAxisDistance / userUnit + fallCoord.correction}px)`
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
