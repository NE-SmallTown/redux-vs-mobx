import React, { useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { Provider, rootStore, useModel } from '../../models';
import { createLine } from '../../utils';

const MobxNode = observer(props => {
    // @ts-ignore
    const { id } = props;

    const rootModel = useModel();

    const node = rootModel.getNodeById(id);

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        nodeRef.current.classList.add('rendered');

        setTimeout(() => {
            nodeRef.current.classList.remove('rendered');
        }, 500);
    });

    const handleClickChange = useCallback(() => {
        node.setNodeValue(String(Math.floor(Math.random() * 10000)));
    }, [ id, node ]);

    console.log(`MobxNode(${id}) render`);

    return (
        <div className='node-wrap' style={{ marginBottom: node.level === 3 ? '200px': 0 }}>
            <div className='node' ref={ nodeRef }>
                <div>{ node.id }</div>

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
                                        <MobxNode id={ child.id } />

                                        {/* TODO 再来看看 🐂🍺 的 Mobx */}
                                        {/* @ts-ignore */}
                                        {/*<MobxNode id={ child.id } style={{ color: 'red' }} />*/}
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

export default function MobxDemo() {
    return (
        <Provider value={ rootStore }>
            <div className='section-mobx-demo'>
                <h2>Mobx demo</h2>

                {/* @ts-ignore */}
                <MobxNode id='1-1' />
            </div>
        </Provider>
    );
}
