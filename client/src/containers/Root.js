import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Switcher from '../components/Switcher'
import Notification from '../utils/notifications'
import users from '../thunks/users'

const mapStateToProps = ({ me, notifications }) => ({ me, notifications })
const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(users.getMe())
})

class Root extends React.Component {
  componentDidMount () {
    this.props.getMe()
  }

  render () {
    return (
      <div>
        <Header />
        <Switcher />
        <Notification notifications={this.props.notifications} />
      </div>
    )
  }
}

Root.propTypes = {
  getMe: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
