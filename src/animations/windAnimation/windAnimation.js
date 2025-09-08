export function windAnimation(windParticles, animationDuration) {

  windParticles.querySelectorAll(".windParticle").forEach(windParticle => {
    windParticle.style.animationDuration = `${animationDuration}s`
  })

  return (resolve, reject) => {
    windParticles.classList.add("animation-fly")

    windParticles.onanimationend = function() {
      this.classList.remove("animation-fly")

      setTimeout(function() {
        windParticles.classList.add("animation-fly")

        windParticles.onanimationend = () => { windParticles.classList.remove("animation-fly") }
      }, 250)
    }

    resolve()
  }

}


