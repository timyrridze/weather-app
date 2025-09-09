import "./rainAnimation.css"

export function rainAnimation(rain, fallCoord, svgWidth) {
  
  return async (resolve) => {
    let lastRainDrop = null

    for (let i = rain.children.length - 1; i >= 0; i--) {
      const rainDrop = rain.children[i].children[0]

      await new Promise((resolve) => {
        let rainDropYTranslation = 0

        requestAnimationFrame(function animate(timestamp) {
          const expected = rainDrop.getBoundingClientRect().y + 70

          rainDropYTranslation += 70
          rainDrop.style.transform = `translate(0, ${(rainDropYTranslation / (svgWidth * 0.01647207059)) + "px"})`

          const being = rainDrop.getBoundingClientRect().y
          
          if(expected !== being) {
            console.log("expected, being")
            console.log(expected, being)
          }

          const rainDropCoord = () => rainDrop.getBoundingClientRect().y
          const rainDropHeight = rainDrop.getBoundingClientRect().height
          const rainDropBottomCoord = () => rainDropCoord() + rainDropHeight

          if (rainDropBottomCoord() < fallCoord) {
            requestAnimationFrame(animate)
          } else {
            console.log(rainDropBottomCoord(), fallCoord)
            rainDrop.style.transform = `translate(0, ${((rainDropYTranslation - (rainDropBottomCoord() - fallCoord)) / (svgWidth * 0.01647207059)) + "px"})`
            console.log(rainDropBottomCoord(), fallCoord)
          }
        })

        // + 1 потому что сам по себе translate при одном и том же входном значении применяет разные значения
        // rainDrop.style.setProperty('--translate-y', `${(fallCoord - (rainDropCoord + rainDropHeight) + 1) / (svgWidth * 0.01647207059)}px`)

        setTimeout(() => resolve(), 200)
      })

      lastRainDrop = rainDrop

      break;
    }
    
    lastRainDrop.onanimationend = resolve
  }
  
}