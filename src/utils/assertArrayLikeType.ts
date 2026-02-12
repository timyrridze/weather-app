import { assertType } from "./assertType";

export function assertArrayLikeType<T>(arrayLike: ArrayLike<unknown>, name: string, isValid: (v: unknown) => v is T): asserts arrayLike is ArrayLike<T> {
  
  for (let i = 0; i < arrayLike.length; i++) {
    const el = arrayLike[i]

    assertType<T>(el, name, isValid)
  }

}