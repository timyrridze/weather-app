export async function weatherAnimation(animations) {

  for (const animation of animations) {
    await new Promise(animation)
  }

}