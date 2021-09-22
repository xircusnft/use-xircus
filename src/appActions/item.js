const COLLECTION_TYPES = {
  SINGLE: 'SINGLE', // Regular ERC721
  MULTIPLE: 'MULTIPLE', // Regular ERC1155
  MUSIC: 'MUSIC', // Combination of subscription and track selling
  SUBSCRIPTION: 'SUBSCRIPTION', // Subscription only e.g fanbase
  TIERS: 'TIERS',
  PLAYTOEARN: 'PLAYTOEARN',
  NFTEMITTING: 'NFTEMITTING', //
  TOKENEMITTING: 'TOKENEMITTING',
  DAO: 'DAO'
  NFTDAO: 'NFTDAO',
}

const itemActions = {
  collectionTypes: () => COLLECTION_TYPES,
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
  addItem: async(store, item = {}) => {
    return await store.actions.requestApi(
      'POST',
      'item',
      {
        ...item,
        market: store.state.market._id,
        chainId: store.state.networkId
      },
      {
        Authorization: `Bearer ${store.state.token}`
      }
    )
  },
  getItems: async(store, filters = {}) => {
    if (store.state.market && store.state.market._id) {
      return await store.actions.requestApi(
        'GET',
        `marketplace/${store.state.market._id}/items`,
        filters
      )
    } else {
      return { status: false, message: 'Market Not Found' }
    }
  },
  getUserItems: async(store, userId, marketId, filters = {}) => {
    return await store.actions.requestApi('GET', `user/${userId}/items`, { market: marketId, ...filters })
  },
  getItemBySlug: async(store, slug) => {
    return await store.actions.requestApi('GET', `item/slug/${slug}`)
  },
  getItemByNFTId: async(store, contract, nftId) => {
    return await store.actions.requestApi('GET', `item/${contract}/${nftId}`)
  },
  getItemByUrl: async(store, url) => {
    return await store.actions.requestApi('GET', `item/${url}`)
  },
  setItem: async(store, item) => {
    // store the item to storage for backup or resume mint
    store.setState({ item }, store.actions.saveState)
  },
  mintItem: async(store, wallet, collectionAddr, item, collectionType = COLLECTION_TYPES.SINGLE) => {
    try {
      if (wallet.status != 'connected') {
        return { status: false, message: 'Wallet Not Connected' }
      }

      let collection = false


      switch (collectionType) {
        case COLLECTION_TYPES.SINGLE:
          collection = await store.actions.getERC721(wallet, collectionAddr)
          break;
        case COLLECTION_TYPES.MULTIPLE:
          collection = await store.actions.getERC1155(wallet, collectionAddr)
          break;
        default:

      }

      // CONVERT PRICES TO WEI
      const name = `${item.name} ${item.legend} ${item.category}`
      let priceWei = 0

      switch (item.listing) {
        // TOKEN ONLY
        case 1:
          priceWei = await store.actions.getERC20ToWei(wallet, item.token, item.price)
          break;
        // USD TOKEN
        case 2:
          priceWei = await store.actions.getERC20ToWei(wallet, item.usd, item.price)
          break;
        // WEI
        case 3:

          break;
        default:

      }

      if (collection) {

      }

    } catch (e) {

    }
  },
}

export default itemActions
