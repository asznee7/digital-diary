import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from '../thunks/classes'
import styles from './Classes.css'
import routesActions from '../actions/routes'

const mapStateToProps = ({ me, student, class: loadedClass }) => ({ me, student, loadedClass })

const mapDispatchToProps = dispatch => ({
  getClass: (id) => dispatch(classes.getClass(id)),
  goToForbidden: () => dispatch(routesActions.goToForbidden())
})

class StudentClass extends React.Component {
  constructor(){
    super()
    this.state = {
      searchData: '',
      student: {},
      students: [],
      fetched: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (!prevState.fetched && nextProps.student.data && !nextProps.loadedClass.data) {
      nextProps.getClass(nextProps.student.data.class.id)
      return { student: nextProps.student.data, fetched: true }
    }
    if (nextProps.loadedClass.data){
      console.log(nextProps.loadedClass.data)
      return {
        student: nextProps.student.data,
        students: nextProps.loadedClass.data.students
          .filter(i => i.name.toLowerCase().includes(prevState.searchData.toLowerCase()))
          .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
      }
    }
    if (nextProps.me.data && nextProps.me.data.role !== 'student') {
      nextProps.goToForbidden()
      return null
    }
    return null
  }

  onChange = (e) => {
    this.setState({
      searchData: e.target.value
    })
  }

  renderRows = (students) => {
    if (!students) {
      return null
    }
    return students.map(student => (
      <div key={student.id}
           className={styles.classRow}
           style={{cursor:'default'}} >
        {student.name}
      </div>
    ))
  }

  render() {
    const { students, student: { class: studentClass } } = this.state
    return (
      <div>
        <h5>You are a student in class {studentClass && <i>{studentClass.name}&nbsp;</i>}</h5>
        <h5>Your classmates list: </h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
        <div className={styles.classContainer}>{this.renderRows(students)}</div>
      </div>
    )
  }
}

StudentClass.propTypes = {
  student: PropTypes.object.isRequired,
  loadedClass: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired,
  goToForbidden: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass)
