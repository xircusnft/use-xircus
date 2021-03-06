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
  isAuthed: false,
  user: false,
  token: false,
  authHeaders: {},

  item: false,

  layout: 'Standard',
  market: false,
  current: false,
  referral: '',

  deployers: false,
  networks: [],
  networkSet: false,
  networkId: 56,
  network: {
    networkId: 56,
    active: true,
    alias: 'bsc',
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
