import Cookie from './cookie'

export default class AccountData {
  static get() {
    return Cookie.get('__clustercubes-sales-accountData__')
  }

  static set(value) {
    return Cookie.set('__clustercubes-sales-accountData__', value)
  }

  static isHq() {
    const accountData = AccountData.get()
    return accountData.role.rank === 0
  }

  static isNew() {
    const accountData = AccountData.get()
    return accountData.status === 'new'
  }
}
