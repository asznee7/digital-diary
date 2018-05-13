import './Header.css'
import React, { Component } from 'react'

class Header extends Component{
  render() {
    return (
      <div>
        <h4>Digital Diary</h4>
        <div>
          <span>User Example</span>
          <a href='#'>Logout</a>
        </div>
      </div>
    )
  }
}

export default Header