import React, { useCallback, useEffect, useRef } from 'react';
import { Provider, useDispatch, connect } from 'react-redux';

import { createLine } from '../../utils';
import { reduxStore, setNodeValue } from '../../store';

const ReduxNode = connect((store, props) => {
    // @ts-ignore
    const rootNode = store.rootNode;
    let targetNode;

    function traverse(no) {
        // @ts-ignore
        if (no.id !== props.id) {
            no.children.forEach(n => {
                traverse(n);
            });
        } else {
            targetNode = no;
        }
    }

    traverse(rootNode);

    return targetNode;
})(props => {
    // @ts-ignore
    const { id, ...node } = props;

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        nodeRef.current.classList.add('rendered');

        setTimeout(() => {
            nodeRef.current.classList.remove('rendered');
        }, 500);
    });

    const dispatch = useDispatch();

    const handleClickChange = useCallback(() => {
        dispatch(setNodeValue(id, Math.floor(Math.random() * 10000)));
    }, [ dispatch, id ]);

    console.log(`ReduxNode(${id}) render`);

    return (
        <div className='node-wrap'>
            <div className='node' ref={ nodeRef }>
                <div>{ id }</div>

                <div className='value'>{ node.value }</div>

                <div className='action' onClick={ handleClickChange }>change</div>
            </div>

            {
                !!node.children.length && (
                    <div className='children-wrap'>
                        {
                            node.children.map((child, index) => {
                                const style: any = {};

                                if (child.level === 2) {
                                    switch (index) {
                                        case 0: {
                                            style.left = -400 + 'px';
                                            style.transform = 'translateX(-100%)';

                                            break;
                                        }
                                        case 1: {
                                            style.left = 0;
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                        case 2: {
                                            style.left = 400 + 'px';
                                            style.transform = 'translateX(100%)';

                                            break;
                                        }
                                    }
                                } else if (child.level === 3) {
                                    switch (child.id) {
                                        case '3-1': {
                                            style.left = -50 + 'px';
                                            style.transform = 'translateX(-100%)';

                                            break;
                                        }
                                        case '3-2': {
                                            style.left = 150 + 'px';
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                        case '3-3': {
                                            style.left = -150 + 'px';
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                        case '3-4': {
                                            style.left = 150 + 'px';
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                        case '3-5': {
                                            style.left = -150 + 'px';
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                        case '3-6': {
                                            style.left = 150 + 'px';
                                            style.transform = 'translateX(0)';

                                            break;
                                        }
                                    }
                                }

                                return (
                                    <div
                                        key={ child.id }
                                        className='child-wrap'
                                        style={ style }
                                        ref={node => {
                                            if (node) {
                                                const parent = nodeRef.current.getBoundingClientRect();
                                                const childPosition = node.getBoundingClientRect();

                                                createLine('redux-demo', parent.x + 75, parent.y + 150, childPosition.x + 75, childPosition.y);
                                            }
                                        }}
                                    >
                                        {/* @ts-ignore */}
                                        <ReduxNode id={ child.id } />

                                        {/* TODO 上面是完全无敌究极理想情况。。。实际上很可能 ReduxNode 会接收一个非原语类型的 prop */}
                                        {/* 比如下面这样。。。。我们可以看看效果 */}
                                        {/* @ts-ignore */}
                                        {/*<ReduxNode id={ child.id } whatEver={ {} } />*/}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
});

export default function ReduxDemo() {
    return (
        <Provider store={ reduxStore }>
            <div className='section-redux-demo'>
                <h2>Redux demo</h2>

                {/* @ts-ignore */}
                <ReduxNode id='1-1' />
            </div>
        </Provider>
    );
}
