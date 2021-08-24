import React from 'react'
import { globalStore, appState, appActions } from 'use-xircus'
console.log("APPSTATE", appState, appActions)
const useGlobal = globalStore(React, appState, appActions)
export default useGlobal;
