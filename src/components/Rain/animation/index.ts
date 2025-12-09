import "./rainAnimation.css"
import type { AnimationPromise } from "./types"
import { getUserUnitInPx } from "../../../utils/getUserUnitInPx"
import { createAnimationQueue } from "./createAnimationQueue"

interface FallCoord {
  value: number,
  correction: number
}

const ANIMATION_ITERATION_DELAY: number = 2000

export function rainAnimation(rain: SVGGElement, fallCoordValue: number) {

  const fallCoord: FallCoord = {
    value: fallCoordValue,
    correction: navigator.userAgent.includes("Firefox") ? 0.5 : -1
  }

  return async (resolve: (value: void) => void) => {
    const typedRaindrops: SVGPathElement[] = []
    const animationQueue = createAnimationQueue()

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0]
      const raindropParts = rain.children[i].children[1]

      if (!(raindrop instanceof SVGPathElement)) {
        throw ("raindrop expected to be of type SVGPathElement")
      }

      if (!(raindropParts instanceof SVGGElement)) {
        throw ("raindropParts expected to be of type SVGGElement")
      }

      typedRaindrops.push(raindrop)

      fallAnimation(raindrop, fallCoord).then(() => {
        makeInvisible(raindrop)
        moveToFallCoord(raindrop, fallCoord)
        moveToFallCoord(raindropParts, fallCoord)

        const animationPromiseResolver = animationQueue.pushAnimationPromise()

        breakOffAnimation(raindropParts).then(() => {
          if (animationPromiseResolver) animationPromiseResolver(null)
        })
      })

      if (i != 0) await wait(ANIMATION_ITERATION_DELAY)
    }

    // Ждать пока закончатся все breakOffAnimation
    await Promise.all(animationQueue.queue)

    console.log("fadeIn start")

    for (let i = 0; i < typedRaindrops.length; i++) {
      const raindrop = typedRaindrops[i]

      fadeInToStartAnimation(raindrop).then(() => {
        removeTranslation(raindrop)
        makeVisible(raindrop)
      })

      if (i != typedRaindrops.length - 1) await wait(ANIMATION_ITERATION_DELAY)
    }
  }

}

function fallAnimation<T extends SVGGraphicsElement>(raindrop: T, fallCoord: FallCoord): AnimationPromise {
  raindrop.style.setProperty('--fall-y', computeTranslationToFallCoord(raindrop, fallCoord))
  raindrop.classList.add("animation-fall")

  return asyncOnAnimationEnd(raindrop, () => {
    raindrop.style.removeProperty("--fall-y")
    raindrop.classList.remove("animation-fall")
  })
}

function breakOffAnimation(raindropParts: SVGGElement): AnimationPromise {
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
    raindropParts.classList.remove("animation-break-off") 
  })
}

function fadeInToStartAnimation(raindrop: SVGGraphicsElement): AnimationPromise {
  raindrop.style.setProperty("--fade-in-y", "0px")
  raindrop.classList.add("animation-fade-in")
  
  return asyncOnAnimationEnd(raindrop, () => {
    raindrop.style.removeProperty("--fade-in-y")
    raindrop.classList.remove("animation-fade-in") 
  })
}

function animate(element: SVGGraphicsElement, animationClass: string, customProperties) {
  
}

function asyncOnAnimationEnd(element: SVGGraphicsElement, onAnimationEnd: () => void): AnimationPromise {
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

function removeTranslation(element: SVGGraphicsElement): void {
  element.style.removeProperty("--translate-y")
}

function wait(ms: number): Promise<null> {
  return new Promise(resolve => setTimeout(() => resolve(null), ms))
}