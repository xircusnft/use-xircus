export const fetcher = async(method = 'GET', url = '', data = {}, headers = {}) => {
  try {
    const _method = ['PUT', 'DELETE'].indexOf(method) > -1 ? `_method=${method}` : ''
    const _data = method == 'GET' ? Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&') : '';
    const reply = await fetch(`${url}?${_method}${_data}`, {
      method: method!='GET' ? 'POST' : 'GET',
      body: method!='GET' ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    return await reply.json()
  } catch (error) {
    return { status: false, error, errors: [] }
  }
}

export default fetcher
