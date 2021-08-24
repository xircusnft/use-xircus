export const appState = {
  env: 'development',
  config: {
    apiUrl: 'https://api.xircus.app',
    ipfsUrl: 'https://ipfs.infura.io:5001',
    storage: 'x!RcUsNFTm@rk3t'
  },
  status: 'Status Message',
  loading: false,
  isSigned: false,
  user: false,
  token: false,
  deployer: false,
  market: false,
  networkId: 56,
  network: {
    networkId: 56,
    active: true,
    name: 'Binance Smart Chain',
    symbol: 'bnb',
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
}

export default appState
