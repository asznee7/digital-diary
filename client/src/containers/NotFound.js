import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain())
})

class NotFound extends React.Component {
  render () {
    return (
      <div className='error'>
        <div>The page you are looking for can't be find</div>
        <h1>404</h1>
        <div><span className='error-go-back-link' onClick={this.props.goToMain}>Back to the site</span></div>
      </div>
    )
  }
}

NotFound.propTypes = {
  goToMain: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(NotFound)
