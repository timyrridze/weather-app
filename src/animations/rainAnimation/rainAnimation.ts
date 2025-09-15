import "./rainAnimation.css"

function getYTranslateCorrection() {
  return navigator.userAgent.includes("Firefox") ? 0.5 : -1
}

export function rainAnimation(rain: HTMLElement, fallCoord: number, svgWidth: number) {
  
  return async (resolve) => {
    let lastRaindrop = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop: SVGPathElement = rain.children[i].children[0]

      await new Promise((resolve: (value: unknown) => void) => {
        const raindropCoord = raindrop.getBoundingClientRect().y
        const raindropHeight = raindrop.getBoundingClientRect().height

        raindrop.style.setProperty('--translate-y', `${(fallCoord - (raindropCoord + raindropHeight)) / (svgWidth * 0.01647207059) + getYTranslateCorrection()}px`)

        raindrop.classList.add("animation-fall")

        setTimeout(() => resolve(null), 200)
      })

      lastRaindrop = raindrop
    }

    lastRaindrop.onanimationend = resolve
  }
  
}