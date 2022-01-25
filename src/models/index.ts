import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { getInitialData } from '../data';

const Node = types
    .model({
      level: types.number,
      id: types.string,
      value: types.string,
      children: types.array(types.late(() => Node)),
    })
    .actions(self => ({
      setNodeValue(newValue) {
        self.value = newValue;
      }
    }));

function getNodeModelById(rootNode, id) {
  let targetNode;

  function traverse(node) {
    if (targetNode) {
      return;
    }

    if (node.id === id) {
      targetNode = node;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    }
  }

  traverse(rootNode)

  return targetNode;
}

const RootModel = types
  .model({
    rootNode: Node,
  })
  .actions(self => ({
    getNodeById(id) {
      return getNodeModelById(self.rootNode, id);
    },
  }));

let initialState = RootModel.create({
  rootNode: getInitialData(),
});

if (process.browser) {
  const data = localStorage.getItem("rootState");
  if (data) {
    const json = JSON.parse(data);
    if (RootModel.is(json)) {
      initialState = RootModel.create(json);
    }
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  // console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useModel() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
}
