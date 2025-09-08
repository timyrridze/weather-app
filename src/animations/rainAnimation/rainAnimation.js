import "./rainAnimation.css"

export function rainAnimation(rain, fallCoord, svgWidth) {
  return async (resolve, reject) => {

    let lastRainDrop = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const rainDrop = rain.children[i].children[0]

      await new Promise((resolve) => {
        const rainDropCoord = rainDrop.getBoundingClientRect().y
        const rainDropHeight = rainDrop.getBoundingClientRect().height

        // + 1 потому что сам по себе translate при одном и том же входном значении применяет разные значения
        rainDrop.style.setProperty('--translate-y', `${(fallCoord - (rainDropCoord + rainDropHeight) + 1) / (svgWidth * 0.01647207059)}px`)

        rainDrop.classList.add("animation-fall")

        setTimeout(() => resolve(), 200)
      })

      lastRainDrop = rainDrop
    }
    
    lastRainDrop.onanimationend = resolve
  }
  
}