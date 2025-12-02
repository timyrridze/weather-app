import type { AnimationPromise } from "./types"

type AnimationPromiseValue = AnimationPromise extends Promise<infer P> ? P : never
type Resolver = Parameters<ConstructorParameters<typeof Promise<AnimationPromiseValue>>[0]>[0]

export function createAnimationQueue(): {
  queue: AnimationPromise[],
  pushAnimationPromise: () => Resolver | void
} {

  return {
    queue: [],
    pushAnimationPromise() {
      let resolver: Resolver | undefined

      const animationPromise: AnimationPromise = new Promise(resolve => {
        resolver = resolve
      })

      this.queue.push(animationPromise)

      if (resolver !== undefined) return resolver
    }
  }

}