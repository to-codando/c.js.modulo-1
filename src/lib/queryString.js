const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check yout params')
  }
  return `${key}=${value}`
}

export const queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&')

module.exports.parse = string => {
  const isListValues = /\w+,/gi

  return Object.fromEntries(
    string.split('&').map(item => {
      const [key, value] = item.split('=')
      return isListValues.test(value) ? [key, value.split(',')] : [key, value]
    })
  )
}
