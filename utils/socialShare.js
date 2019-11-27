export default class SocialShare {
  static link(type, url) {
    switch (type) {
      case 'fb':
        return `https://www.facebook.com/share.php?u=${url}`
      case 'tw':
        return `https://twitter.com/home?status=${url}`
      case 'wa':
        return `https://api.whatsapp.com/send?text=${url}`
      case 'tl':
        return `https://telegram.me/share/url?url=${url}`
      default:
        return null
    }
  }
}
