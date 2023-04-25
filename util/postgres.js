export function arrayToPostGresArray(array) {
  if (!array?.length) return ''
  return `{ ${array.map(item => `"${item.trim()}"`).join(',')} }`
}
