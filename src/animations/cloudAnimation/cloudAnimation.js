export function cloudAnimation(cloud, animationDuration) {

  cloud.style.animationDuration = `${animationDuration}s`

  return (resolve, reject) => {
    cloud.classList.add("animation-move-out")
    cloud.onanimationend = () => {
      cloud.classList.add("animation-move-in")

      cloud.onanimationend = () => {
        cloud.classList.remove("animation-move-in")
        cloud.classList.remove("animation-move-out")

        resolve()
      }
    }
  }
  
}