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
  addItem: async(store, item = {}) => {
    return await store.actions.requestApi(
      'POST',
      'item',
      {
        ...item,
        market: store.state.market._id,
        chainId: store.state.networkId
      },
      {
        Authorization: `Bearer ${store.state.token}`
      }
    )
  },
  getItems: async(store, filters = {}) => {
    if (store.state.market && store.state.market._id) {
      return await store.actions.requestApi(
        'GET',
        `marketplace/${store.state.market._id}/items`,
        filters
      )
    } else {
      return { status: false, message: 'Market Not Found' }
    }
  },
  getUserItems: async(store, filters = {}) => {
    if (store.user && store.user._id) {
      return await store.actions.requestApi('GET', `u/${store.user._id}/items`, filters)
    } else {
      return { status: false, message: 'User Not Found' }
    }
  },
  getItemBySlug: async(store, slug) => {
    return await store.actions.requestApi('GET', `item/slug/${slug}`)
  },
  getItemByNFTId: async(store, contract, nftId) => {
    return await store.actions.requestApi('GET', `item/${contract}/${nftId}`)
  },
  getItemByUrl: async(store, url) => {
    return await store.actions.requestApi('GET', `item/${url}`)
  }
}

export default itemActions
