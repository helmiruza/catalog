import axios from 'axios'
import qs from 'qs'
import Raven from 'raven-js'
import Cookies from 'universal-cookie'

class ApiReq {
  static uri (path) {
    const baseUrl = process.env.BASE_URL
    const version = process.env.VERSION

    const apiEndpoint = `${baseUrl}${version}`
    return `${apiEndpoint}${path}`
  }

  static headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }

  static request (resources, params, opts = {}) {
    let headers = ApiReq.headers()
    let tokenHeader = {}

    if (ApiReq.hasToken()) {
      tokenHeader = { 'authorization': `Bearer ${ApiReq.getToken()}` }
    } else if (opts.cookie) {
      tokenHeader = { 'authorization': `Bearer ${ApiReq.getToken(opts.cookie)}` }
    }

    headers = Object.assign(headers, tokenHeader);

    let endpoint = ApiReq.uri(resources)

    let options = Object.assign({}, {
      url: endpoint,
      headers,
    }, opts)

    return axios(endpoint, options)
      .then(ApiReq.handleResponse)
      .catch(ApiReq.handleError)
  }

  static get (resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      method: 'GET', data: null, crossdomain: true
    })

    resources = (!params) ? resources : resources + '?' + qs.stringify(params)

    return ApiReq.request(resources, null, opts)
  }

  static post (resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: ApiReq.serialize(params),
      method: 'POST'
    })

    return ApiReq.request(resources, params, opts)
  }

  static formidable (resource, request, opts = {}) {
    let headers = {}; //ApiReq.headersWithToken()
    delete headers['content-type']
    delete headers['accept']

    opts = {
      headers: { ...headers, 'content-type': 'multipart/form-data'  },
      method: opts.method,
      data: request,
    };

    return ApiReq.request(resource, request, opts);
  }

  static put (resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: ApiReq.serialize(params),
      method: 'PUT'
    })

    return ApiReq.request(resources, params, opts)
  }

  static delete (resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: ApiReq.serialize(params),
      method: 'DELETE'
    })

    return ApiReq.request(resources, params, opts)
  }

  static serialize (params) {
    return JSON.stringify(params)
  }

  static handleResponse (response) {
    const { status, data } = response

    return (status >= 200 && status <= 300) ? data : { error: true, data }
  }

  static handleError (error) {
    const errs = error && error.response ? error.response.data : error
    Raven.captureException(new Error(errs), {
      tags: {
        error_type: 'API Failed',
        error_url: error.request.responseURL + ':' + error.request.status,
      }
    })
    return errs;
  }

  static hasToken (options) {
    return ApiReq.getToken() ? true : false
  }

  static getToken (cookie) {
    const cookies = cookie ? new Cookies(cookie) : new Cookies();
    let token = cookies.get('__clustercubes-sales__')
    return token
  }
}

export default ApiReq
