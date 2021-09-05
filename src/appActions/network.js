import { NETWORKS } from '../networks'

const networkActions = {
  getNetworks: (store) => {
    return store.state.env === 'development'
      ? NETWORKS
      : NETWORKS.filter(n => n.env == store.state.env)
  },
  getNetwork: async(store, wallet) => {
    let networkId = 56
    if (wallet.ethereum) {
      networkId = web3.utils.hexToNumber(wallet.ethereum.chainId)
    }
    return {
      networkId,
      network: NETWORKS.find(n => n.networkId == networkId)
    }
  },
  setNetworks: (store, networkIds = []) => {
    const networks = store.actions.getNetworks()
    if (networks && networks.length > 0) {
      store.setState(
        { networks: networks.filter(n => networkIds.indexOf(n.networkId) > -1) },
        store.actions.saveState
      )
    }
  },
  selectNetwork: (store, network) => {
    let market = store.state.market
    if (market) {
      const current = market.networks.find(n => n.chainId == network.networkId)
      const layout = current.layout
      store.setState(
        {
          network,
          current,
          layout,
          networkId: network.networkId,
          isSigned: false,
          networkSet: true
        },
        store.actions.saveState
      )
    }
  },
  setNetwork: (store, networkId) => {
    const networks = store.actions.getNetworks()
    const network = networks.find(n => n.networkId == networkId)
    if (network) {
      store.setState({ network }, store.actions.saveState)
    }
  },
  changeNetwork: async(store, wallet, network) => {
    try {
      if (network.networkId == 1) {
        await wallet.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: network.chainId,
          }]
        })
      } else {
        await wallet.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: network.chainId,
            chainName: network.chainName,
            nativeCurrency: network.nativeCurrency,
            rpcUrls: network.rpcUrls,
            blockExplorerUrls: network.blockExplorerUrls
          }]
        })
      }

      const market = store.state.market
      const current = market.networks.find(n => n.chainId == network.networkId)
      const layout = current.layout

      store.setState({
        networkId: network.networkId,
        network,
        current,
        layout,
        isSigned: false,
        networkSet: true
      }, store.actions.saveState)

    } catch (e) {
      console.log("FAILED TO CHANGE NETWORK", e)
    }
  },
  getWalletConfig: (store) => {
    return {
      chainId: store.state.networkId,
      connectors: {
        walletconnect: {
          rpcUrl: store.state.network.rpcUrls[0],
          bridge: 'https://n.bridge.walletconnect.org/'
        },
        walletlink: {
          url: store.state.network?.rpcUrls[0]
        }
      }
    }
  },
}

export default networkActions
