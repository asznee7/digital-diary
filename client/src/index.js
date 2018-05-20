import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './css/normalize.css?raw'
import './css/skeleton.css?raw'
import './css/custom.css?raw'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import Root from './containers/Root'

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
