import * as React from 'react'
import * as xGlobal from './useGlobal';
import * as xStore from './useStore';
import * as xGraph from './useGraph';

export const globalStore = xStore.default;
export const useGlobal = xGlobal.default;
export const useGraph = xGraph.default;
