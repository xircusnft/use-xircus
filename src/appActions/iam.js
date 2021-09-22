// TODO:
// UPDATE USER PROFILE
// GET USER ITEMS
// CONFIGURE USER DATA TO SHARE
// INTERNAL KYC

const iamActions = {
  setReferral: async(store, referral) => {
    store.setState({ referral })
  },
  getAddress: async(store, address) => {
    return await store.actions.requestApi(
      'POST',
      `user/${address}`,
      { market: store.state.market._id, ref: store.state.referral }
    )
  },
  login: async(store, wallet) => {
    const reply = await store.actions.getAddress(wallet.account)
    if (reply.status) {
      store.setState({
        isSigned: true,
        user: reply.user,
        token: false
      })
    }
    return reply
  },
  logout: (store, wallet) => {
    wallet.reset()
    store.setState({
      isSigned: false,
      networkSet: false,
      user: false,
      token: false
    }, store.actions.saveState)
  },
  sign: async(store, wallet) => {
    let reply = await store.actions.getAddress(wallet.account)
    if (reply.status) {
      let msg = `Signing with Xircus Authentication - ${reply.user.nonce}`
      let signature = await wallet.ethereum.request({
        jsonrpc: '2.0',
        method: 'personal_sign',
        params: [msg, wallet.account]
      })
      if (signature) {
        await store.actions.signAddress(wallet.account, signature)
      }
    }
    return reply
  },
  signAddress: async(store, address, signature) => {
    const reply = await store.actions.requestApi(
      'POST', `user/${address}/sign`, { signature }
    )
    if (reply.status) {
      store.setState({
        isAuthed: true,
        isSigned: true,
        token: reply.token,
        wallet: reply.user.address,
        user: reply.user,
        authHeaders: { Authorization: `Bearer ${reply.token}` }
      })
    }
    return reply
  },
  getReferralByCode: async(store, code) => {
    return await store.actions.requestApi('GET', `code/${code}`, {})
  },
  updateProfile: async(store, profile) => {
    if (store.state.isAuthed) {
      return await store.actions.requestApi('POST', 'profile', profile, store.state.authHeaders)
    } else {
      return false
    }
  },
  updatePhotos: async(store, photos) => {
    if (store.state.isAuthed) {
      return await store.actions.requestApi('POST', 'profile/photos', photos, store.state.authHeaders)
    } else {
      return false
    }
  }
}

export default iamActions
