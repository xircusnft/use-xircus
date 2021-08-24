import 'regenerator-runtime/runtime'

import appActions from './app'
import authActions from './auth'
import contractActions from './contract'
import networkActions from './network'
import walletActions from './wallet'
import itemActions from './item'

export default {
  ...appActions,
  ...authActions,
  ...contractActions,
  ...networkActions,
  ...walletActions,
  ...itemActions
}
