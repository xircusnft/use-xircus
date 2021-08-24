import useWeb3 from './useWeb3'
import pairAbi from './contracts/LPPair.json'
import factoryAbi from './contracts/LPFactory.json'
import routerAbi from './contracts/LPRouter.json'
import tokenAbi from './contracts/Token.json'
import centerAbi from './contracts/XircusCenterFeatClonable.json'
import metaAbi from './contracts/XircusMetaFeatClonable.json'

export const filterMethods = (methods) => Object.keys(methods)
  .filter(m => !m.startsWith('0x'))
  .reduce((a, m) => ({ ...a, [m]: methods[m] }), {})

export const useLPPair = () => {
  const web3 = useWeb3()

  const getPair = async(address) => {
    if (address && !address.startsWith('0x') && address.length != 42) return false
    const pair = new web3.eth.Contract(pairAbi, address)
    const name = await pair.methods.name().call()
    const token0 = await pair.methods.token0().call()
    const token1 = await pair.methods.token1().call()
    const decimals = await pair.methods.decimals().call()
    const totalSupply = await pair.methods.totalSupply().call()
    const symbol = await pair.methods.symbol().call()
    const factory = await pair.methods.factory().call()
    const reserves = await pair.methods.getReserves().call()
    return {
      name,
      address,
      token0,
      token1,
      decimals,
      totalSupply,
      symbol,
      factory,
      reserves,
      balanceOf: pair.methods.balanceOf
    }
  }

  return { getPair, web3 }
}

export const useLPFactory = (address) => {
  const web3 = useWeb3()

  const getFactory = async(address) => {
    const dpx = new web3.eth.Contract(factoryAbi, address)
    return filterMethods(dpx.methods)
  }

  return { web3, getFactory }
}

export const useLPRouter = () => {
  const web3 = useWeb3()

  const getRouter = async(address) => {
    const router = new web3.eth.Contract(routerAbi, address)

    return {
      ...filterMethods(router.methods),
      factory: await router.methods.factory().call()
    }
  }

  return { web3, getRouter }
}

export const useToken = () => {
  const web3 = useWeb3()

  const getToken = async(address, full = false) => {
    const token = new web3.eth.Contract(tokenAbi, address)

    return {
      ...(full ? filterMethods(token.methods) : { balanceOf: token.methods.balanceOf }),
      name: await token.methods.name().call(),
      symbol: await token.methods.symbol().call(),
      decimals: await token.methods.decimals().call(),
      totalSupply: await token.methods.totalSupply().call()
    }
  }

  const getNFTToken = async(address) => {
    const token = new web3.eth.Contract(tokenAbi, address)

    return {
      name: await token.methods.name().call(),
      symbol: await token.methods.symbol().call(),
    }
  }

  const getTokenBalance = async(address, account) => {
    const token = await getToken(address, true)
    return await token.balanceOf(account).call()
  }

  return { web3, getToken, getTokenBalance, getNFTToken }
}

export const useCenter = () => {
  const web3 = useWeb3()

  const getCenter = async(address, full = true) => {
    const center = new web3.eth.Contract(centerAbi, address)
    const market = Object.values(await center.methods.getMarket().call())

    return {
      ...(full ? filterMethods(center.methods) : {}),
      address,
      name: market[0],
      url: market[1],
      logo: market[2],
      layout: market[3],
      mintFee: await center.methods.mintFee().call(),
      txFee: await center.methods.txFee().call(),
      tokens: await center.methods.getTokens().call(),
      meta: await center.methods.getMeta().call(),
      tokens: Object.values(await center.methods.getAllTokens().call()), // token, router, pair, pairToken, usdToken
    }
  }

  return {
    getCenter,
    web3
  }
}
//
// export const useCollection = () => {
//   const web3 = useWeb3()
//
//   // GET ALL DEPLOYER METHODS
//   const get721Deployer = async(deployer) => {
//     const dpx = new web3.eth.Contract(require('../contracts/abi/Xircus721Deployer.json'), deployer)
//     return filterMethods(dpx.methods)
//   }
//
//   const get1155Deployer = async(deployer) => {
//     const dpx = new web3.eth.Contract(require('../contracts/abi/Xircus1155Deployer.json'), deployer)
//     return filterMethods(dpx.methods)
//   }
//
//   const getUser721Collections = async(deployer, account) => {
//     const dpx = await get721Deployer(deployer)
//     const collections = []
//     for (let address of await dpx.getOwnerCollections(account).call()) {
//       collections.push(await get721Collection(address))
//     }
//     return collections
//   }
//
//   const getUser1155Collections = async(deployer, account) => {
//     const dpx = await get1155Deployer(deployer)
//     const collections = []
//     for (let address of await dpx.getOwnerCollections(account).call()) {
//       collections.push(await get1155Collection(address))
//     }
//     return collections
//   }
//
//   const get721Collection = async(address) => {
//     const cx = new web3.eth.Contract(require('../contracts/abi/Xircus721.json'), address)
//     return {
//       ...filterMethods(cx.methods),
//       address,
//       multi: false,
//       name: await cx.methods.name().call(),
//       symbol: await cx.methods.symbol().call(),
//       center: await cx.methods.center().call(),
//       token: await cx.methods.token().call(),
//       usdToken: await cx.methods.usdToken().call(),
//       deployer: await cx.methods.deployer().call(),
//       totalSupply: await cx.methods.totalSupply().call(),
//       // TODO: commission totals
//     }
//   }
//
//   const get1155Collection = async(address) => {
//     const cx = new web3.eth.Contract(require('../contracts/abi/Xircus1155.json'), address)
//     return {
//       ...filterMethods(cx.methods),
//       address,
//       multi: true,
//       name: await cx.methods.name().call(),
//       symbol: await cx.methods.symbol().call(),
//       center: await cx.methods.center().call(),
//       token: await cx.methods.token().call(),
//       usdToken: await cx.methods.usdToken().call(),
//       deployer: await cx.methods.deployer().call(),
//       totalSupply: await cx.methods.totalSupply().call(),
//       // TODO: commission totals
//     }
//   }
//
//   return {
//     get721Deployer,
//     getUser721Collections,
//     get1155Deployer,
//     getUser1155Collections,
//     get721Collection,
//     get1155Collection,
//   }
// }


export const useMeta = (address) => {
  const web3 = useWeb3()

  const getMeta = async(manager) => {
    const contract = new web3.eth.Contract(metaAbi, manager)

    return {
      ...filterMethods(contract.methods),
      address: manager,
      name: await contract.methods.name().call(),
      stats: await contract.methods.getStats().call(),
    }
  }

  return {
    web3,
    getMeta
  }
}
