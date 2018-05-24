import * as React from 'react'
import styles from './Main.css'

class Main extends React.Component {
  render () {
    return (
      <div className={styles.main}>
        <h2>Welcome to Digital Diary</h2>
        <h5>You can start with menu on the top</h5>
      </div>
    )
  }
}

export default Main
