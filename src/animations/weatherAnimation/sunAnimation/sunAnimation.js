import "./sunAnimation.scss"

export function sunAnimation(sun) {

  return (resolve, reject) => {
    const sunCircles = sun.querySelector("#sunCircles")
    const sunBeams = sun.querySelector("#sunbeams")

    sunCircles.classList.add("animation-scale-small")
    sunBeams.classList.add("animation-scale-medium")

    sunCircles.onanimationend = () => {
      sunCircles.classList.remove("animation-scale-small")
    }

    sunBeams.onanimationend = () => {
      sunBeams.classList.remove("animation-scale-medium")

      resolve()
    }
  }

}