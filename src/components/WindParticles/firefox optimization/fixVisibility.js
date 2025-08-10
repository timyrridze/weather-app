export default function fixVisibility(windParticlesNode) {
  function fixYCoord(windParticle) {
    let getCurrentCoord = () => windParticle.getBoundingClientRect().y
    const targetCoord = Math.round(getCurrentCoord())
    let yCoordChange

    let conditionResultWasReturned = false
    const getConditionResult = () => {

      if (getCurrentCoord() < targetCoord) {
        conditionResultWasReturned = true
        yCoordChange = 0.01

        return getCurrentCoord() < targetCoord
      }
      else if (getCurrentCoord() > targetCoord) {
        if (conditionResultWasReturned === true) return false

        yCoordChange = -0.01

        return getCurrentCoord() > targetCoord
      }
      else {
        return false
      }

    }

    while (getConditionResult() === true) {
      const dAttribute = windParticle.getAttribute("d")
      const xAndYCoordsPattern = /(?<xCoord>\d+(?:.\d+)?) (?<yCoord>\d+(.\d+)?)/i
      const newDAttribute = dAttribute.replace(xAndYCoordsPattern, (match, xCoord, yCoord) => {
        return `${xCoord} ${(+yCoord + yCoordChange).toFixed(2)}`
      })

      windParticle.setAttribute("d", newDAttribute)
    }

  }

  for (let i = 0; i < windParticlesNode.children.length; i++) {
    const currentWindParticle = windParticlesNode.children[i]
    fixYCoord(currentWindParticle)
  }
}