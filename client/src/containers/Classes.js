import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'
import styles from './Classes.css'

const mapStateToProps = ({ classes }) => ({ classes })
const mapDispatchToProps = dispatch => ({
  goToClass: (id) => dispatch(routesActions.goToClass(id)),
})

class Classes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchItem: '',
      currentlyDisplayed: this.props.classes.data
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { currentlyDisplayed: nextProps.classes.data }
  }

  renderRows = (classes) => {
    if (!classes) {
      return null
    }
    return classes.entities.map((item) => (
      <div key={item.id}
           onClick={() => this.props.goToClass(item.id)}
           className={styles.classRow}>
        {item.name}
      </div>
    ))
  }

  onChange = (e) => {
    const { entities } = this.props.classes.data
    let newlyDisplayed = {}
    newlyDisplayed.entities = entities.filter(classEntity =>
      classEntity.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      searchItem: e.target.value,
      currentlyDisplayed: newlyDisplayed
    })
  }

  render () {
    const  { currentlyDisplayed } = this.state
    return (
      <div>
        <h5>Class list:</h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
        <div className={styles.classContainer}>{this.renderRows(currentlyDisplayed)}</div>
      </div>
    )
  }
}

Classes.propTypes = {
  classes: PropTypes.object.isRequired,
  goToClass: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)
