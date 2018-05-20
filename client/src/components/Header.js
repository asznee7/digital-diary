import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import routesActions from '../actions/routes'
import security from '../thunks/security'

const mapStateToProps = ({ page, me }) => ({ page, me })
const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain()),
  goToClasses: () => dispatch(routesActions.goToClasses()),
  logout: () => dispatch(security.logout())
})

class Header extends Component {
  render () {
    if (['Login', 'NotFound'].indexOf(this.props.page) > -1) {
      return null
    }

    return (
      <div>
        <span onClick={this.props.goToMain}>Home</span>
        <span onClick={this.props.goToClasses}>Classes</span>
        <span onClick={this.props.logout}>Logout</span>
        <span>
          <span>{this.props.me.data && this.props.me.data.name}</span>
        </span>
      </div>
    )
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired,
  goToClasses: PropTypes.func.isRequired,
  goToMain: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
