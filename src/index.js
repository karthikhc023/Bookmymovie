import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';

ReactDOM.render(<Controller />, document.getElementById('root'));
//ReactDOM.render(<h1>Testing without controller</h1>, document.getElementById('root'));
registerServiceWorker();
