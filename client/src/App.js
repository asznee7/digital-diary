import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Page from './components/Page'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <Route exact path="/" component={Page}/>
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
