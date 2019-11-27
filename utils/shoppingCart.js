export default class ShoppingCart {
  static getData() {
    let data = localStorage.getItem('shoppingCartItems')
    return data ? JSON.parse(data) : []
  }

  static count() {
    const items = ShoppingCart.getData()
    return items ? items.length : 0
  }

  static add(item) {
    let items = ShoppingCart.getData()
    items.push(item)
    ShoppingCart.set(items)
  }

  static set(items) {
    localStorage.setItem('shoppingCartItems', JSON.stringify(items))
  }

  static clear() {
    localStorage.removeItem('shoppingCartItems')
  }
}
