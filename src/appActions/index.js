import 'regenerator-runtime/runtime'

import appActions from './app'
import marketActions from './market'
import iamActions from './iam'
import networkActions from './network'
import walletActions from './wallet'
import itemActions from './item'

export default {
  ...appActions,
  ...marketActions,
  ...iamActions,
  ...networkActions,
  ...walletActions,
  ...itemActions
}
