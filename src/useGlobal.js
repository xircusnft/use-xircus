import * as React from 'react';
import globalStore from './useStore';
import actions from './actions';

const initialState = {
  user: false,
  token: false,
  deployer: false,
  network: false,
  market: false
}

const useGlobal = globalStore(React, initialState, actions)

export default useGlobal;
