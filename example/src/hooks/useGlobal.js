import * as React from 'react';
import { globalStore } from 'use-xircus';

const actions = {
  update: (store) => {
    store.setState({ username: 'xircusteam' })
  }
}

const initialState = {
  username: 'xircusdev'
}

const useGlobal = globalStore(React, initialState, actions)

export default useGlobal;
