export function calculateAnimationDuration(windspeed) {
  let animationDuration = 7 / windspeed

  if (animationDuration > 1.6) animationDuration = 1.6
  else if (animationDuration < 0.7) animationDuration = 0.7

  return animationDuration
}