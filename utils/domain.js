export default class Domain {
  static absoluteUrl(req) {
    let url = req.headers['x-forwarded-host'] || ''
    return url
  }

  static host(req) {
    let host = req.headers.host || ''
    return host
  }

  static subdomain(url) {
    let result = null
    const subdomains = url.split('.')

    if (subdomains.length > 3) {
      result = subdomains[0]
    }
    return result
  }
}
