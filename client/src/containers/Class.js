import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = ({ class: loadedClass }) => ({ loadedClass })

class Class extends React.Component {
  onChange = (e) => {}
  render () {
    const { loadedClass } = this.props
    if (!loadedClass.data)
      return null

    return (
      <div>
        <h5><strong>{this.props.loadedClass.data.name}</strong> class students:</h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>

      </div>
    )
  }
}

Class.propTypes = {
  loadedClass: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Class)
