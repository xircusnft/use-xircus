export const NETWORKS = [
  {
    networkId: 1,
    active: false,
    alias: 'ether',
    name: 'Ethereum Mainnet',
    symbol: 'eth',
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', 'https://cloudflare-eth.com/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  {
    networkId: 56,
    active: true,
    alias: 'bsc',
    name: 'Binance Smart Chain',
    env: 'production',
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
  {
    networkId: 97,
    active: true,
    alias: 'bsc',
    name: 'Binance Test Chain',
    env: 'development',
    symbol: 'bnb',
    chainId: '0x61',
    chainName: 'Binance Test Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  {
    networkId: 137,
    active: true,
    alias: 'polygon',
    name: 'Polygon Matic Mainnet',
    env: 'production',
    symbol: 'matic',
    chainId: '0x89',
    chainName: 'Polygon Matic Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.matic.network/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  {
    networkId: 250,
    active: false,
    alias: 'fantom',
    name: 'Fantom Opera Mainnet',
    env: 'production',
    symbol: 'ftm',
    chainId: '0xFA',
    chainName: 'Fantom Opera Mainnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network/'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  // {
  //   networkId: 128,
  //   active: false,
  //   name: 'Huobi ECO Chain Mainnet',
  //   symbol: 'ht',
  //   chainId: '0x61',
  //   chainName: 'Huobi ECO Chain Mainnet',
  //   nativeCurrency: {
  //     name: 'HT',
  //     symbol: 'HT',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://http-mainnet.hecochain.com/'],
  //   blockExplorerUrls: ['https://hecoinfo.com/'],
  // },
  // {
  //   networkId: 1284,
  //   active: false,
  //   name: 'Moonbeam Polkadot',
  //   symbol: 'mbeam',
  //   chainId: '0x61',
  //   chainName: 'Moonbeam Polkadot',
  //   nativeCurrency: {
  //     name: 'Glimmer',
  //     symbol: 'GLMR',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://rpc.moonbeam.network'],
  //   blockExplorerUrls: ['https://moonbeam.network/networks/moonbeam'],
  // },
  // {
  //   networkId: 1285,
  //   active: false,
  //   name: 'Moonriver Kusama',
  //   symbol: 'mriver',
  //   chainId: '0x61',
  //   chainName: 'Moonriver Kusama',
  //   nativeCurrency: {
  //     name: 'River',
  //     symbol: 'RIVER',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://rpc.moonriver.network'],
  //   blockExplorerUrls: ['https://moonbeam.network/networks/moonriver'],
  // },
]
