import localstore from 'store'

const authActions = {
  saveState: (store) => {
    localstore.set(store.state.config.storage, store.state)
  },
  getAddress: async(store, address) => {
    const reply = await fetch(`${store.state.config.apiUrl}/user/${address}`, { method: 'POST' })
    return await reply.json()
  },
  login: async(store, wallet) => {
    const reply = await store.actions.getAddress(wallet.account)
    if (reply.status) {
      store.setState({ isSigned: true, user: reply.user })
    }
    return reply
  },
  logout: (store, wallet) => {
    wallet.reset()
    store.setState({ isSigned: false, user: false, token: false }, store.actions.saveState)
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
        await store.actions.login(wallet.account, signature)
      }
    }
  },
  getReferralByCode: async(store, code) => {
    const reply = await fetch(`${store.state.config.apiUrl}/code/${code}`)
    return await reply.json()
  },
}

export default authActions
