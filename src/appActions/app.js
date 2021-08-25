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
  }
}

export default appActions
