const itemActions = {
  uploadIPFS: async(store, file) => {
    const formData = new FormData()
    formData.append('path', file)
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      }
    }
    const reply = await fetch(`${store.state.config.ipfsUrl}/api/v0/add?pin=true`, options)
    return await reply.json()
  },
  addItem: async(store, item) => {
    return await store.actions.request(
      'POST',
      `${store.state.config.ipfsUrl}/item`,
      { ...item, chainId: store.state.networkId },
      { Authorization: `Bearer ${store.state.token}` }
    )
  },
  getItems: async(store, url, filters = {}) => {
    return await store.actions.requestApi('GET', `${url}/items`, filters)
  }
}

export default itemActions
