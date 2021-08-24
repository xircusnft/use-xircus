import * as xStore from './useStore'
import * as xActions from './appActions'
import * as xState from './appState'
import * as xContract from './useContract'

// export * from './useContract'

export const contracts = xContract
export const appActions = xActions.default
export const appState = xState.default
export const globalStore = xStore.default
