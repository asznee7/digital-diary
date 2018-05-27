import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from '../thunks/classes'
import styles from './Classes.css'

const mapStateToProps = ({ student, class: loadedClass }) => ({ student, loadedClass })
const mapDispatchToProps = dispatch => ({
  getClass: (id) => dispatch(classes.getClass(id))
})

class StudentClass extends React.Component {
  constructor(){
    super()
    this.state = {
      searchItem: '',
      student: {},
      students: [],
      fetched: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (!prevState.fetched && nextProps.student.data && !nextProps.loadedClass.data) {
      nextProps.getClass(nextProps.student.data.class.id)
      return { student: nextProps.student, fetched: true }
    }
    if (nextProps.loadedClass.data){
      return {
        student: nextProps.student.data,
        students: nextProps.loadedClass.data.students
          .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
      }
    }
    return null
  }

  onChange = (e) => {
    const { students } = this.props.loadedClass.data
    let filteredStudents = students.filter(classEntity =>
      classEntity.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      searchItem: e.target.value,
      students: filteredStudents.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
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
  getClass: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass)
