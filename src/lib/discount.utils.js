import Dinero from 'dinero.js'

const Money = Dinero
Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

export const calculatePercentageDiscount = (
  amount,
  { condition, quantity }
) => {
  return condition?.percentage && condition.minimum < quantity
    ? amount.percentage(condition.percentage)
    : Money({ amount: 0 })
}

export const calculateQuantityDiscount = (amount, { quantity, condition }) => {
  debugger
  const isEven = quantity % 2 === 0

  if (condition?.quantity && condition.quantity < quantity) {
    return amount.percentage(isEven ? 50 : 40)
  }

  return Money({ amount: 0 })
}

export const calculateDiscount = (amount, quantity, condition) => {
  const conditionList = Array.isArray(condition) ? condition : [condition]
  const [higherDiscount] = conditionList
    .map(conditionItem => {
      const item = { condition: conditionItem, quantity }
      if (conditionItem.percentage) {
        return calculatePercentageDiscount(amount, item).getAmount()
      } else if (conditionItem.quantity) {
        return calculateQuantityDiscount(amount, item).getAmount()
      }
    })
    .sort((a, b) => b - a)

  return Money({ amount: higherDiscount })
}
