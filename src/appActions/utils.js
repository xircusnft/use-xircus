export const querify = (params) => Object
  .keys(params)
  .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  .join('&')

export const filterMethods = (methods) => Object.keys(methods)
  .filter(m => !m.startsWith('0x'))
  .reduce((a, m) => ({ ...a, [m]: methods[m] }), {})

export const validAddress = address => address
  && address.startsWith('0x')
  && address.length == 42
