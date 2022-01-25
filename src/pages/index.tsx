import React from 'react';

import ReduxDemo from './redux-demo';
import MobxDemo from './mobx-demo';

export default function Home() {
  return (
    <div className='page-root'>
        <ReduxDemo />

        <MobxDemo />
    </div>
  );
}
