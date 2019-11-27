export default class Typo {
  static capitalizeFirstWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static capitalizeAll(string) {
    let res = string
      .split('_')
      .map(s => Typo.capitalizeFirstWord(s))
      .join(' ')

    return res
  }

  static initials(string) {
    let res = string
      .split(' ')
      .map(s => Typo.capitalizeFirstWord(s))

    if (res.length > 2) {
      res = res.slice(0,2)
    }

    res = res
      .map(s => s.charAt(0))
      .join('')

    return res
  }
}
