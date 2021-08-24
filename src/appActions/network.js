import { NETWORKS } from '../networks'

const networkActions = {
  getNetworks: (store) => {
    return store.state.env === 'development'
      ? NETWORKS
      : NETWORKS.filter(n => n.env == store.state.env)
  },
  getNetwork: async(store) => {
    let networkId = 56
    if (window.ethereum) {
      networkId = web3.utils.hexToNumber(window.ethereum.chainId)
    }
    return {
      networkId,
      network: NETWORKS.find(n => n.networkId == networkId)
    }
  },
  changeNetwork: async(store, wallet, network) => {
    try {

      if (network.networkId == 1) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: network.chainId,
          }]
        })
      } else {
        await window.ethereum.request({
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

      // const shouldReload = (store.state.networkId != network.networkId)

      store.setState({
        networkId: network.networkId,
        network,
      }, store.actions.saveState)

      // if (shouldReload) window.location.reload()

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
