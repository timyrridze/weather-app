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
    const animationPromises: Promise<null>[] = []
    
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
        makeInvisible(raindrop)
        moveToFallCoord(raindrop, fallCoord)
        moveToFallCoord(raindropParts, fallCoord)

        animationPromises.push(breakOffAnimation(raindropParts))
      })

      if (i != 0) await wait(ANIMATION_ITERATION_DELAY)
    }

    // Ждать пока закончатся все breakOffAnimation
    await Promise.all(animationPromises)

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0]

      
    }
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

async function breakOffAnimation(raindropParts: SVGGElement): Promise<null> {

  for (let i = 0; i < raindropParts.children.length; i++) {
    const raindropPart = raindropParts.children[i]

    if (!(raindropPart instanceof SVGPathElement)) {
      throw ("raindropPart expected to be of type SVGPathElement")
    }

    raindropPart.style.setProperty("--stroke-dashoffset", `${raindropPart.getTotalLength()}px`)

    raindropPart.onanimationend = () => {
      raindropPart.style.removeProperty("--stroke-dashoffset")
    }
  }

  raindropParts.classList.add("animation-break-off")

  return await new Promise((resolve) => {
    raindropParts.onanimationend = () => {
      raindropParts.classList.remove("animation-break-off")

      resolve(null)
    }
  })
  
}

function fadeInAnimation(raindrop: SVGPathElement, yCoord: number) {
  raindrop.classList.add("animation-fade-in")
  raindrop.onanimationend = () => raindrop.classList.remove("animation-fade-in")
}

function moveToFallCoord(element: SVGGElement, fallCoord: FallCoord) {
  let userUnit: number = getUserUnitInPx(element)

  const elementBoundingClientRect = element.getBoundingClientRect()
  const yAxisDistance: number = fallCoord.value - (elementBoundingClientRect.y + elementBoundingClientRect.height)

  element.style.transform = `translateY(${yAxisDistance / userUnit + fallCoord.correction}px)`
}

function makeInvisible(element: SVGGraphicsElement) {
  element.classList.add("invisible")
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
