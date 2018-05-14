import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css?raw';
import './css/skeleton.css?raw';
import './css/custom.css?raw';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
