import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'
import styles from './Classes.css'
import classes from '../thunks/classes'

const mapStateToProps = ({ classes, teacher }) => ({ classes, teacher })
const mapDispatchToProps = dispatch => ({
  goToClass: (id) => dispatch(routesActions.goToClass(id)),
  getClasses: (classesIds) => dispatch(classes.getClasses(classesIds))
})

class Classes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchItem: '',
      currentlyDisplayed: this.props.classes.data
    }
    this.props.getClasses(this.props.teacher.data.classes.map((oneClass) => oneClass.id))
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
    const { currentlyDisplayed } = this.state
    let subject
    if (this.props.teacher.data)
      subject = this.props.teacher.data.subject

    return (
      <div>
        <h5>You are a teacher, you teach {subject && <i>{subject.name}&nbsp;</i>}</h5>
        <h5>Your class list: </h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
        <div className={styles.classContainer}>{this.renderRows(currentlyDisplayed)}</div>
      </div>
    )
  }
}

Classes.propTypes = {
  classes: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  goToClass: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)
