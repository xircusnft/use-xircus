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
  addItem: (store, config) => {
    if (store.state.env == 'production' && config.apiUrl.startsWith('https://')) return;
    store.setState({ config }, store.actions.saveState)
  },
}

export default itemActions
