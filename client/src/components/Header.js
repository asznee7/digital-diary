import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'
import security from '../thunks/security'
import styles from './Header.css'

const mapStateToProps = ({ page, me }) => ({ page, me })

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain()),
  goToClasses: () => dispatch(routesActions.goToClasses()),
  goToLogin: () => dispatch(routesActions.goToLogin()),
  logout: () => dispatch(security.logout())
})

class Header extends Component {
  constructor(){
    super()
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps){
    if (['Login', 'NotFound', 'Forbidden'].indexOf(nextProps.page) > -1) {
      return null
    }

    if (!nextProps.me.data) {
      nextProps.goToLogin()
    }

    return null
  }

  render () {
    if (['Login', 'NotFound', 'Forbidden'].indexOf(this.props.page) > -1) {
      return null
    }

    return (
      <div className='full-header'>
        <div className={styles.logo}>
          <h3 onClick={this.props.goToMain}>Digital Diary</h3>
        </div>
        <div className={styles.menu}>
          <span onClick={this.props.goToClasses}>Classes</span>
        </div>
        <div className={styles.user}>
          <span className={styles.userInfo}>{this.props.me.data && this.props.me.data.name}</span>
          <button className={styles.userAction} onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired,
  goToClasses: PropTypes.func.isRequired,
  goToMain: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
