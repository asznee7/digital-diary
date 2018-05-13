import './Page.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

class Page extends Component {
  render(){
    return(
      <div className='page-container'>
        <Header>Header!!</Header>
        <div>Main page!</div>
      </div> )
  }
}

export default Page
