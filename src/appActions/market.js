const marketActions = {
  getMarket: async(store, url) => {
    return await store.actions.requestApi('GET', `marketplace/${url}`)
  },
  setMarket: (store, market) => {
    if (market && market.name) {
      const networks = store.actions.getNetworks()
      const chainId = market.networks[0].chainId
      const chainIds = market.networks.map(n => n.chainId)
      const current = market.networks.find(n => n.chainId == chainId)
      store.setState(
        {
          market,
          current,
          layout: current.layout,
          networks: networks.filter(n => chainIds.indexOf(n.networkId) > -1)
        },
        store.actions.saveState
      )
    }
  },
  setMarketByNetwork: (store, market, networkId) => {
    if (market && market.name) {
      const networks = store.actions.getNetworks()
      const chainIds = market.networks.map(n => n.chainId)
      const current = market.networks.find(n => n.chainId == networkId)
      store.setState(
        {
          market,
          current,
          layout: current.layout,
          networks: networks.filter(n => chainIds.indexOf(n.networkId) > -1)
        },
        store.actions.saveState
      )
    }
  },
}

export default marketActions
