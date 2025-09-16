import "./rainAnimation.css"


function getYTranslateCorrection() {
  return navigator.userAgent.includes("Firefox") ? 0.5 : -1
}

export function rainAnimation(rain: SVGElement, fallCoord: number, svgWidth: number) {

  return async (resolve: (value: void) => void) => {
    let lastRaindrop = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const raindrop = rain.children[i].children[0] as typeof rain

      await new Promise((resolve: (value: void) => void) => {
        const raindropCoord = raindrop.getBoundingClientRect().y
        const raindropHeight = raindrop.getBoundingClientRect().height

        raindrop.style.setProperty('--translate-y', `${(fallCoord - (raindropCoord + raindropHeight)) / (svgWidth * 0.01647207059) + getYTranslateCorrection()}px`)

        raindrop.classList.add("animation-fall")

        setTimeout(() => resolve(), 200)
      })

      lastRaindrop = raindrop
    }

    if (lastRaindrop !== null) lastRaindrop.onanimationend = () => resolve()
  }
  
}