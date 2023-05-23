export function chunkArray(array: any[], chunkSize: number) {
  const chunkedArrays = []
  let index = 0

  while (index < array.length) {
    chunkedArrays.push(array.slice(index, index + chunkSize))
    index += chunkSize
  }

  return chunkedArrays
}
