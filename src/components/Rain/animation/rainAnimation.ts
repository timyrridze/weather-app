import { getUserUnitInPx } from "../../../utils/getUserUnitInPx"
import "./rainAnimation.css"

interface FallCoord {
  value: number,
  correction: number
}
type AnimationReturnType = Promise<null>

const ANIMATION_ITERATION_DELAY: number = 2000

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

      let animationPromiseResolver: Promise<null> | null = null
      animationPromises[i] = new Promise<null>(resolve => { animationPromiseResolver = resolve })

      fallAnimation(raindrop, fallCoord).then(() => {
        makeInvisible(raindrop)
        moveToFallCoord(raindrop, fallCoord)
        moveToFallCoord(raindropParts, fallCoord)

        breakOffAnimation(raindropParts).then(() => animationPromiseResolver())
      })

      if (i != 0) await wait(ANIMATION_ITERATION_DELAY)
    }

    // Ждать пока закончатся все breakOffAnimation
    await Promise.all(animationPromises)

    console.log("fadeIn start")

    // for (let i = 0; i < typedRaindrops.length; i++) {
    //   const raindrop = typedRaindrops[i]

    //   fadeInAnimation(raindrop, "0px").then(() => {
    //     removeTranslation(raindrop)
    //     makeVisible(raindrop)
    //   })

    //   if (i != typedRaindrops.length - 1) await wait(ANIMATION_ITERATION_DELAY)
    // }
  }
  
}

function fallAnimation<T extends SVGGraphicsElement>(raindrop: T, fallCoord: FallCoord): AnimationReturnType {
  raindrop.style.setProperty('--fall-y', computeTranslationToFallCoord(raindrop, fallCoord))
  raindrop.classList.add("animation-fall")

  return asyncOnAnimationEnd(raindrop, () => {
    raindrop.classList.remove("animation-fall")
    raindrop.style.removeProperty("--fall-y")
  })
}

function breakOffAnimation(raindropParts: SVGGElement): AnimationReturnType {

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

  return asyncOnAnimationEnd(raindropParts, () => { 
    console.log("breakOff end")
    raindropParts.classList.remove("animation-break-off") 
  })
}

function fadeInAnimation(raindrop: SVGPathElement, yTranslation: string): AnimationReturnType {
  raindrop.classList.add("animation-fade-in")
  raindrop.style.setProperty("--fade-in-y", yTranslation)

  return asyncOnAnimationEnd(raindrop, () => {
    raindrop.classList.remove("animation-fade-in") 
    raindrop.style.removeProperty("--fade-in-y")
  })
}

function asyncOnAnimationEnd(element: SVGGraphicsElement, onAnimationEnd: () => void): Promise<null> {
  return new Promise(resolve => {

    element.onanimationend = () => {
      onAnimationEnd()

      resolve(null)
    }

  })
}

function computeTranslationToFallCoord(element: SVGGraphicsElement, fallCoord: FallCoord): string {
  let userUnit: number = getUserUnitInPx(element)

  const elementBoundingClientRect = element.getBoundingClientRect()
  const yAxisDistance: number = fallCoord.value - (elementBoundingClientRect.y + elementBoundingClientRect.height)

  return `${yAxisDistance / userUnit + fallCoord.correction}px`
}

function moveToFallCoord(element: SVGGraphicsElement, fallCoord: FallCoord): void {
  element.style.setProperty("--translate-y", computeTranslationToFallCoord(element, fallCoord))
}

function makeInvisible(element: SVGGraphicsElement): void {
  element.classList.add("invisible")
}

function makeVisible(element: SVGGraphicsElement): void {
  element.classList.remove("invisible")
}

function removeTranslation(element: SVGGraphicsElement) {
  element.style.removeProperty("--translate-y")
}

function wait(ms: number): Promise<null> {
  return new Promise(resolve => setTimeout(() => resolve.call(null, null), ms))
}
