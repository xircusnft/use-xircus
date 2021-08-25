const walletActions = {
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
  }
}

export default walletActions
