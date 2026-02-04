export function assertType<T>(value: unknown, name: string, isValid: (v: unknown) => v is T ): asserts value is T {
  if (!isValid(value)) throw new Error(`${name} expected to be of type `)
}