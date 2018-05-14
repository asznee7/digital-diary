import styles from './Header.css'
import React, { Component } from 'react'

class Header extends Component{
  render() {
    return (
      <div className={styles.header}>
        <h5>Digital Diary</h5>
        <div>
          <span>User Example</span>
          <a href='#'>Logout</a>
        </div>
      </div>
    )
  }
}

export default Header
