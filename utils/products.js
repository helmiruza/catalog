import AccountData from './accountData'
import ApiReq from './ApiReq'
import Cookie from './cookie'

export default class AllProducts {
  static async getAccountData() {
    const res = await ApiReq.get('/me')

    if (res.status === 200) {
      return res.data
    }
  }

  static async fetch() {
    const accountData = await AllProducts.getAccountData()
    const allProducts = localStorage.getItem('allProducts')

    if (accountData.role.rank === 0 && !allProducts) {
      let result = []
      const res1 = await ApiReq.get('/products')

      if (res1.status === 200) {
        const products = res1.data.result.filter(p => p.type === 'product')
        const variants = res1.data.result.filter(p => p.type === 'variant_owner')

        result = products

        await Promise.all(variants.map(async (v) => {
          const res2 = await ApiReq.get(`/products/${v.id}`)

          if (res2.status === 200 && res2.data.variants) {
            result = result.concat(res2.data.variants)
          }
        }))

        localStorage.setItem('allProducts', JSON.stringify(result))
      }

      return result
    }

    if (accountData.role.rank === 0 && allProducts) {
      return JSON.parse(allProducts)
    }
  }

  static async fetchNew() {
    await localStorage.removeItem('allProducts')
    const res = await AllProducts.fetch()
    return res
  }
}
