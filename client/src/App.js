import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/login'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={() => { return (<div>main page</div>)}}/>
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
