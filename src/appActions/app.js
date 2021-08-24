const appActions = {
  config: (store, config) => {
    if (store.state.env == 'production' && config.apiUrl.startsWith('https://')) return;
    store.setState({ config }, store.actions.saveState)
  },
}

export default appActions
