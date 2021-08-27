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
    const reply = await fetch(`${store.state.config.ipfsUrl}/item`, {
      method: 'POST',
      body: JSON.stringify({ ...item, chainId: store.state.networkId }),
      headers: { Authorization: `Bearer ${store.state.token}` }
    })
    return await reply.json()
  },
  getItems: async(store, url, filters) => {
    // TODO: Add query builder
    const reply = await fetch(`${store.state.config.ipfsUrl}/marketplace/${url}/items`)
    return await reply.json()
  }
}

export default itemActions
