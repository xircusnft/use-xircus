import 'regenerator-runtime/runtime'

import appActions from './app'
import authActions from './auth'
import networkActions from './network'
import walletActions from './wallet'
import itemActions from './item'

export default {
  ...appActions,
  ...authActions,
  ...networkActions,
  ...walletActions,
  ...itemActions
}
