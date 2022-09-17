import find from 'lodash/find'
import remove from 'lodash/remove'
import Dinero from 'dinero.js'

const Money = Dinero

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

import { calculateDiscount } from './discount.utils'

export class Cart {
  items = []

  add(item) {
    const itemProduct = { product: item.product }

    if (find(this.items, itemProduct)) {
      remove(this.items, itemProduct)
    }

    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }

  getTotal() {
    return this.items
      .reduce((acc, { quantity, product, condition }) => {
        const amount = Money({ amount: quantity * product.price })
        let discount = Money({ amount: 0 })

        if (condition) {
          discount = calculateDiscount(amount, quantity, condition)
        }

        return acc.add(amount).subtract(discount)
      }, Money({ amount: 0 }))
      .getAmount()
  }

  summary() {
    const total = this.getTotal()
    const formatted = Money({ amount: total }).toFormat('$0,0.00')
    const items = this.items

    return {
      total,
      formatted,
      items
    }
  }

  checkout() {
    const { total, items } = this.summary()

    this.items = []

    return {
      total,
      items
    }
  }
}
