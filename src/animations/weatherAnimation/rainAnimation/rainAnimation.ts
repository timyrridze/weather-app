import "./rainAnimation.css"


function getYTranslateCorrection() {
  return navigator.userAgent.includes("Firefox") ? 0.5 : -1
}

function fallAnimation<T extends SVGElement>(raindrop: T, fallCoord: number, svgWidth: number) {
  const raindropCoord = raindrop.getBoundingClientRect().y
  const raindropHeight = raindrop.getBoundingClientRect().height

  raindrop.style.setProperty('--translate-y', `${(fallCoord - (raindropCoord + raindropHeight)) / (svgWidth * 0.01647207059) + getYTranslateCorrection()}px`)

  raindrop.classList.add("animation-fall")
}

function splashAnimation<T extends SVGGElement>(raindropParts: T, ) {
  
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function rainAnimation<T extends SVGElement>(rain: T, fallCoord: number, svgWidth: number) {

  return async (resolve: (value: void) => void) => {
    let lastAnimatedElement: Object & SVGElement = null as unknown as (Object & SVGElement)

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0]
      const raindropParts = rain.children[i].children[1]

      if (!(raindrop instanceof SVGPathElement)) {
        throw ("raindrop expected to be of type SVGPathElement")
      }

      if (!(raindropParts instanceof SVGGElement)) {
        throw ("raindropParts expected to be of type SVGGElement")
      }

      raindrop.onanimationend = () => {
        splashAnimation(raindropParts)
      }

      fallAnimation(raindrop, fallCoord, svgWidth)

      if (i != 0) await sleep(200)

      lastAnimatedElement = raindropParts
    }

    if (lastAnimatedElement != undefined) lastAnimatedElement.onanimationend = () => resolve()
  }
  
}