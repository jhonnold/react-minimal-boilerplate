import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

import './assets/css/tailwind.css';

render(<App />, document.getElementById('root'));

if (module.hot) module.hot.accept();
