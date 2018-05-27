import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain())
})

class Forbidden extends React.Component {
  render () {
    return (
      <div className='error'>
        <div>You don't have permission to access this page</div>
        <h1>403</h1>
        <div><span className='error-go-back-link' onClick={this.props.goToMain}>Back to the site</span></div>
      </div>
    )
  }
}

Forbidden.propTypes = {
  goToMain: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Forbidden)
