/**
 * Returns an array with the values of a TypeScript enum.
 * @param e A TypeScript enum.
 * @returns An array with the enum's values.
 */
function getEnumValues<T>(e: any): T[] {
  return Object.keys(e)
    .filter((key) => isNaN(Number(key)))
    .map((key) => e[key])
}
