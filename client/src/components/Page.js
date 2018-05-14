import styles from './Page.css'
import React, { Component } from 'react'
import Header from './Header'

class Page extends Component {
  render(){
    return(
      <div className={styles.pageContainer}>
        <Header>Header!!</Header>
        <div>Main page!</div>
      </div> )
  }
}

export default Page
