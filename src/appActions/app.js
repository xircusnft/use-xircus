const querify = (params) => Object
  .keys(params)
  .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  .join('&')

const appActions = {
  config: (store, config) => {
    if (store.state.env == 'production' && config.apiUrl.startsWith('https://')) return;
    store.setState({ config }, store.actions.saveState)
  },
  setMarket: (store, market) => {
    if (market && market.name) {
      store.setState({ market, layout: market.layout }, store.actions.saveState)
    }
  },
  getMarket: async(store, url) => {
    const reply = await fetch(`${store.state.config.apiUrl}/marketplace/${url}`)
    return await reply.json()
  },
  switchLayout: (store, layout) => {
    if (layout) {
      store.setState({ layout }, store.actions.saveState)
    }
  },
  requestApi: async(store, method = 'GET', url = '', data = {}, headers = {}) => {
    return await store.actions.request(method, `${store.state.config.apiUrl}/${url}`, data, headers)
  },
  request: async(store, method = 'GET', url = 'https://', data = {}, headers = {}, json = true) => {
    const query = method == 'GET' ? `?${querify(data)}` : ''
    data = json ? JSON.stringify(data) : data
    const reply = await fetch(`${url}${query}`, {
      method: method != 'GET' ? 'POST' : 'GET',
      body: method != 'GET' ? data : null,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    return await reply.json()
  }
}

export default appActions
