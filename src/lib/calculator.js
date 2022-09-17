export const sum = (a, b) => {
  const int1 = parseInt(a)
  const int2 = parseInt(b)

  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error('Please check your input')
  }

  return int1 + int2
}
