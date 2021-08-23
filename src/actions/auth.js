import { API_URL, STORAGE_NAME } from '../config'
import fetcher from '../fetcher'

const authActions = {
  saveState: (store) => {
    localstore.set(STORAGE_NAME, store.state)
  },
  getAddress: async(store, address) => {
    return await fetcher('POST', `${store.state.config.apiUrl}/user/${address}`)
  },
  login: async(store, wallet) => {
    const reply = await store.actions.getAddress(wallet.account)
    if (reply.status) {
      store.setState({ isSigned: true, user: reply.user })
    }
    return reply
  },
  unsign: (store) => {
    store.setState({ isSigned: false }, store.actions.saveState)
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
    return await request('GET', `${store.state.config.apiUrl}/code/${code}`)
  },
}

export default authActions
