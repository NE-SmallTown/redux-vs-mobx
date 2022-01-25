import { createStore, combineReducers } from 'redux';
import produce from'immer';
import get from 'lodash.get';

import { getInitialData } from '../data';

const initialState = getInitialData();

const CHANGE_NODE_VALUE = 'CHANGE_NODE_VALUE';

// action
export const setNodeValue = (id, newValue) => {
    return {
        type: CHANGE_NODE_VALUE,
        id,
        newValue,
    };
};

// reducer
const rootNode = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NODE_VALUE:
            {
                const { id, newValue } = action;

                return produce(state, draft => {
                    let traverseEnd = false;
                    let finalPath = '';

                    function traverse(node, path = '') {
                        if (traverseEnd) {
                            return;
                        }

                        if (node.id === id) {
                            traverseEnd = true;

                            finalPath = path;
                        } else {
                            for (let i = 0; i < node.children.length; i++) {
                                traverse(node.children[i], path ? `${path}.children[${i}]` : `children[${i}]`);
                            }
                        }
                    }

                    traverse(draft);

                    if (finalPath === '') {
                        draft.value = newValue;
                    } else {
                        get(draft, finalPath).value = newValue;
                    }
                });
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    rootNode,
});

export const reduxStore = createStore(rootReducer);