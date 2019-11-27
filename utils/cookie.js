import Cookies from 'universal-cookie';

const DEFAULT_OPTIONS = {
  path: '/',
  secure: false,
  domain: '',
  maxAge: 60 * 60 * 24 * 365 * 2
};

export default class Cookie {
  static cookies = new Cookies();

  static set(key, value, options = {}) {
    return Cookie.cookies.set(key, value, { ...DEFAULT_OPTIONS, ...options });
  }

  static get(key, defaultValue) {
    return Cookie.cookies.get(key) || defaultValue;
  }

  static remove(key, options = {}) {
    return Cookie.cookies.remove(key, { ...DEFAULT_OPTIONS, ...options });
  }
}
