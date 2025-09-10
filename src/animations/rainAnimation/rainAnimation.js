import "./rainAnimation.css"

function getYTranslateCorrection() {
  return navigator.userAgent.includes("Firefox") ? 0.5 : -1
}

export function rainAnimation(rain, fallCoord, svgWidth) {
  
  return async (resolve) => {
    let lastRainDrop = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const rainDrop = rain.children[i].children[0]

      await new Promise((resolve) => {
        const rainDropCoord = rainDrop.getBoundingClientRect().y
        const rainDropHeight = rainDrop.getBoundingClientRect().height

        rainDrop.style.setProperty('--translate-y', `${(fallCoord - (rainDropCoord + rainDropHeight)) / (svgWidth * 0.01647207059) + getYTranslateCorrection()}px`)

        rainDrop.classList.add("animation-fall")

        setTimeout(() => resolve(), 200)
      })

      lastRainDrop = rainDrop
    }

    lastRainDrop.onanimationend = resolve
  }
  
}