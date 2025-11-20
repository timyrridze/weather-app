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
    const typedRaindrops: SVGPathElement[] = []
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

      typedRaindrops.push(raindrop)

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

    for (let i = 0; i < typedRaindrops.length; i++) {
      const raindrop = typedRaindrops[i]

      fadeInAnimation(raindrop, "0px")

      if (i != typedRaindrops.length - 1) await wait(ANIMATION_ITERATION_DELAY)
    }
  }
  
}

async function fallAnimation<T extends SVGGraphicsElement>(raindrop: T, fallCoord: FallCoord): Promise<null> {
  raindrop.style.setProperty('--fall-y', computeTranslationToFallCoord(raindrop, fallCoord))
  raindrop.classList.add("animation-fall")

  return await new Promise((resolve) => {

    raindrop.onanimationend = () => {
      raindrop.classList.remove("animation-fall")
      raindrop.style.removeProperty("--fall-y")

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

async function fadeInAnimation(raindrop: SVGPathElement, yTranslation: string): Promise<null> {
  raindrop.classList.add("animation-fade-in")

  return await new Promise(resolve => {

    raindrop.onanimationend = () => {
      raindrop.classList.remove("animation-fade-in")

      resolve(null)
    }

  })
}

function moveToFallCoord(element: SVGGraphicsElement, fallCoord: FallCoord): void {
  element.style.setProperty("--translate-y", computeTranslationToFallCoord(element, fallCoord))
}

function computeTranslationToFallCoord(element: SVGGraphicsElement, fallCoord: FallCoord): string {
  let userUnit: number = getUserUnitInPx(element)

  const elementBoundingClientRect = element.getBoundingClientRect()
  const yAxisDistance: number = fallCoord.value - (elementBoundingClientRect.y + elementBoundingClientRect.height)

  return `${yAxisDistance / userUnit + fallCoord.correction}px`
}

function makeInvisible(element: SVGGraphicsElement): void {
  element.classList.add("invisible")
}

function makeVisible(element: SVGGraphicsElement): void {
  element.classList.remove("invisible")
}

function asyncOnAnimationEnd(element, callback) {
  return new Promise()
}

function wait(ms: number): Promise<null> {
  return new Promise(resolve => setTimeout(() => resolve.call(null, null), ms))
}
