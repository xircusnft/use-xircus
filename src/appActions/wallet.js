import Web3 from 'web3'
import pairAbi from '../contracts/LPPair.json'
import factoryAbi from '../contracts/LPFactory.json'
import routerAbi from '../contracts/LPRouter.json'
import tokenAbi from '../contracts/Token.json'
import centerAbi from '../contracts/XircusCenterFeatClonable.json'
import metaAbi from '../contracts/XircusMetaFeatClonable.json'
import deployer721 from '../contracts/Xircus721Deployer.json'
import deployer1155 from '../contracts/Xircus1155Deployer.json'
import single721 from '../contracts/Xircus721.json'
import multi1155 from '../contracts/Xircus1155.json'
import { validAddress, filterMethods } from './utils'

const walletActions = {
  getUnitMaps: (store) => {
    return {
      3: 'kwei',
      6: 'mwei',
      9: 'gwei',
      12: 'szabo',
      15: 'finney',
      18: 'ether',
      21: 'kether',
      24: 'mether',
      27: 'gether',
      30: 'tether'
    }
  },
  sendTransaction: async(store, wallet, contract, data, value, gasPrice) => {
    return await wallet.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: wallet.account,
        to: contract,
        data,
        value
      }]
    })
  },
  connectWeb3: (store, wallet) => {
    return new Web3(wallet.ethereum)
  },
  getMarketMeta: async(store, wallet, address) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const contract = new web3.eth.Contract(metaAbi, address)
      return {
        ...filterMethods(contract.methods),
        address,
        name: await contract.methods.name().call(),
        users: await contract.methods.getUsers().call(),
        collections: await contract.methods.getCollections().call(),
        totalUsers: await contract.methods.getTotalUsers().call(),
        stats: await contract.methods.getStats().call(),
      }
    } catch (e) {
      console.error("UNABLE TO LOAD XIRCUS META", { address, error: e })
      return false
    }
  },
  getMarketCenter: async(store, wallet, address, full) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const center = new web3.eth.Contract(centerAbi, address)
      const market = Object.values(await center.methods.getMarket().call())

      let routers = []
      let pairs = []
      let usds = []
      let configs = {}
      const tokens = Object.values(await center.methods.getAllTokens().call())
      const collections = Object.values(await center.methods.getAllCollections().call())

      for (let tokenAddr of tokens) {
        const token = Object.values(await center.methods.getToken(tokenAddr).call())
        routers.push(token[1])
        pairs.push(token[2])
        usds.push(token[3])
        configs[tokenAddr] = token
      }

      return {
        ...(full ? filterMethods(center.methods) : {}),
        address,
        name: market[0],
        url: market[1],
        logo: market[2],
        layout: market[3],
        mintFee: await center.methods.mintFee().call(),
        txFee: await center.methods.txFee().call(),
        primary: Object.values(await center.methods.getTokens().call()),
        tokens: Object.values(await center.methods.getAllTokens().call()), // token, router, pair, pairToken, usdToken
        meta: await center.methods.getMeta().call(),
        deployer: await center.methods.deployer().call(),
        pool: await center.methods.pool().call(),
        provider: await center.methods.provider().call(),
        routers,
        pairs,
        usds,
        tokens,
        collections,
        configs
      }

    } catch (e) {
      console.error("UNABLE TO LOAD XIRCUS CENTER", { address, error: e })
      return false
    }
  },
  getExchangeRouter: async(store, wallet, address, full = false) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const router = new web3.eth.Contract(routerAbi, address)
      return {
        ...(full
          ? filterMethods(router.methods)
          : {
              getAmountsIn: router.methods.getAmountsIn,
              getAmountsOut: router.methods.getAmountsOut
            }
          ),
        factory: await router.methods.factory().call()
      }
    } catch (e) {
      console.error("UNABLE TO LOAD EXCHANGE ROUTER", { address, error: e })
      return false
    }
  },

  parseToWei: (store, wallet, amount, decimals = 18) => {
    const web3 = store.actions.connectWeb3(wallet)
    const unitMaps = store.actions.getUnitMaps()
    return web3.utils.toWei(amount, unitMaps[decimals])
  },
  parseFromWei: (store, wallet, amount, decimals = 18) => {
    const web3 = store.actions.connectWeb3(wallet)
    const unitMaps = store.actions.getUnitMaps()
    return web3.utils.fromWei(amount, unitMaps[decimals])
  },
  getERC20ToWei: async(store, wallet, token, amount) => {
    try {
      token = await store.actions.getERC20(wallet, token)
      return store.actions.parseToWei(wallet, amount, token.decimals)
    } catch (e) {
      return 0
    }
  },
  getERC20FromWei: async(store, wallet, token, amount) => {
    try {
      token = await store.actions.getERC20(wallet, token)
      return store.actions.parseFromWei(wallet, amount, token.decimals)
    } catch (e) {
      return 0
    }
  },
  getExchangeQuote: async(store, wallet, address, amountIn = '1', token, usd) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const router = await store.actions.getExchangeRouter(wallet, address)
      const unitMaps = store.actions.getUnitMaps()

      if (amountIn > 0 && validAddress(token) && validAddress(usd)) {
        token = await store.actions.getERC20(wallet, token)
        usd = await store.actions.getERC20(wallet, usd)

        const amounts = await router
          .getAmountsIn(web3.utils.toWei(amountIn, unitMaps[usd.decimals]),
            [token.address, usd.address]
          )
          .call()

        return {
          status: true,
          quote: amounts[0],
          decimals: web3.utils.fromWei(amounts[0], unitMaps[token.decimals])
        }
      }
    } catch (e) {
      console.error("UNABLE TO LOAD EXCHANGE QUOTE", { address, amountIn, token, usd, error: e })
      return {
        status: false,
        quote: 0,
        decimals: 0,
      }
    }
  },
  getExchangePair: async(store, wallet, address) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const pair = new web3.eth.Contract(pairAbi, address)
      const token0Addr = await pair.methods.token0().call()
      const token1Addr = await pair.methods.token1().call()
      const token0 = await store.actions.getERC20(wallet, token0Addr)
      const token1 = await store.actions.getERC20(wallet, token1Addr)
      return {
        address,
        token0,
        token1,
        name: await pair.methods.name().call(),
        tokens: [token0Addr, token1Addr],
        decimals: await pair.methods.decimals().call(),
        totalSupply: await pair.methods.totalSupply().call(),
        symbol: await pair.methods.symbol().call(),
        factory: await pair.methods.factory().call(),
        reserves: await pair.methods.getReserves().call(),
        balanceOf: pair.methods.balanceOf
      }
    } catch (e) {
      console.error("UNABLE TO LOAD EXCHANGE PAIR", { address, error: e })
      return false
    }
  },
  getExchangeFactory: async(store, wallet, address) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const dpx = new web3.eth.Contract(factoryAbi, address)
      return filterMethods(dpx.methods)
    } catch (e) {
      console.error("UNABLE TO LOAD EXCHANGE FACTORY", { address, error: e })
      return false
    }
  },
  getERC20: async(store, wallet, address, full = false) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const token = new web3.eth.Contract(tokenAbi, address)
      return {
        ...(full
          ? filterMethods(token.methods)
          : {
            balanceOf: token.methods.balanceOf,
            allowance: token.methods.allowance,
            approve: token.methods.approve,
            increaseAllowance: token.methods.increaseAllowance,
            decreaseAllowance: token.methods.decreaseAllowance
          }),
        address,
        name: await token.methods.name().call(),
        symbol: await token.methods.symbol().call(),
        decimals: await token.methods.decimals().call(),
        totalSupply: await token.methods.totalSupply().call()
      }
    } catch (e) {
      console.error("UNABLE TO LOAD ERC20/BEP20", { address, error: e })
      return false
    }
  },
  getCollection: async(store, wallet, address, full = false) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const token = new web3.eth.Contract(single721, address)

      return {
        address,
        ...(
          full ?
          {
            getItem: token.methods.getItem,
            getCollectors: token.methods.getCollectors,
            getURI: token.methods.getURI,
            mint: token.methods.mint,
            buy: token.methods.buy,
            bid: token.methods.bid,
            buyBid: token.methods.buyBid,
            setItem: token.methods.setItem,
            setExtra: token.methods.setExtra,
            setBidder: token.methods.setBidder,
            setListing: token.methods.setListing,
          }
          : {}
        ),
        name: await token.methods.name().call(),
        symbol: await token.methods.symbol().call(),
        supply: await token.methods.totalSupply().call(),
        category: await token.methods.category().call(),
        visible: await token.methods.visible().call(),
        center: await token.methods.center().call(),
        deployer: await token.methods.deployer().call(),
        token: await token.methods.token().call(),
        usd: await token.methods.usdToken().call()
      }
    } catch (e) {
      console.error("UNABLE TO LOAD COLLECTION", { address, error: e })
      return false
    }
  },
  getERC721: async(store, wallet, address) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const token = new web3.eth.Contract(single721, address)
      return {
        address,
        ...filterMethods(token.methods),
        name: await token.methods.name().call(),
        symbol: await token.methods.symbol().call(),
        supply: await token.methods.totalSupply().call(),
        category: await token.methods.category().call(),
        visible: await token.methods.visible().call(),
        center: await token.methods.center().call(),
        deployer: await token.methods.deployer().call(),
        token: await token.methods.token().call(),
        usd: await token.methods.usdToken().call()
      }
    } catch (e) {
      console.error("UNABLE TO LOAD ERC721", { address, error: e })
      return false
    }

  },
  getERC1155: async(store, wallet, address) => {
    try {
      const web3 = store.actions.connectWeb3(wallet)
      const token = new web3.eth.Contract(multi1155, address)
      return {
        address,
        ...filterMethods(token.methods),
        name: await token.methods.name().call(),
        symbol: await token.methods.symbol().call(),
        supply: await token.methods.totalSupply().call(),
        category: await token.methods.category().call(),
        visible: await token.methods.visible().call(),
        center: await token.methods.center().call(),
        deployer: await token.methods.deployer().call(),
        token: await token.methods.token().call(),
        usd: await token.methods.usdToken().call()
      }
    } catch (e) {
      console.error("UNABLE TO LOAD ERC1155", { address, error: e })
      return false
    }
  }
}

export default walletActions
