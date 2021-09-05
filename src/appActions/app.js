import localstore from 'store'
import { querify } from './utils'

const appActions = {
  config: (store, config) => {
    store.setState({ config }, store.actions.saveState)
  },
  saveState: (store) => {
    localstore.set(store.state.config.storage, store.state)
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
