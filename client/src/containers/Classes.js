import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import routesActions from '../actions/routes'
import styles from './Classes.css'
import classes from '../thunks/classes'

const mapStateToProps = ({ classes, teacher, me }) => ({ classes, teacher, me })

const mapDispatchToProps = dispatch => ({
  goToClass: (id) => dispatch(routesActions.goToClass(id)),
  getClasses: (classesIds) => dispatch(classes.getClasses(classesIds)),
  goToForbidden: () => dispatch(routesActions.goToForbidden())
})

class Classes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchData: '',
      classes: this.props.classes.data,
      teacher: {},
      fetched: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (!prevState.fetched && nextProps.teacher.data && !nextProps.classes.data) {
      nextProps.getClasses(nextProps.teacher.data.classes.map(oneClass => oneClass.id))
      return { teacher: nextProps.teacher.data, fetched: true }
    }
    if (nextProps.classes.data){
      return {
        teacher: nextProps.teacher.data,
        classes: nextProps.classes.data.entities
          .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
      }
    }
    if (nextProps.me.data && nextProps.me.data.role !== 'teacher') {
      nextProps.goToForbidden()
      return null
    }
    return null
  }

  renderRows = (classes) => {
    if (!classes) {
      return null
    }
    return classes.map((item) => (
      <div key={item.id}
           onClick={() => this.props.goToClass(item.id)}
           className={styles.classRow}>
        {item.name}
      </div>
    ))
  }

  onChange = (e) => {
    const { entities } = this.props.classes.data
    let classes = entities.filter(classEntity =>
      classEntity.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      searchData: e.target.value,
      classes: classes.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
    })
  }

  render () {
    const { classes, teacher: { subject } } = this.state
    return (
      <div>
        <h5>You are a teacher, you teach {subject && <i>{subject.name}&nbsp;</i>}</h5>
        <h5>Your class list: </h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
        <div className={styles.classContainer}>{this.renderRows(classes)}</div>
      </div>
    )
  }
}

Classes.propTypes = {
  classes: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  goToClass: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  goToForbidden: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)
