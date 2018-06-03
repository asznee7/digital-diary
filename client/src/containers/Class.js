import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './Class.css'
import { PlusIcon } from 'react-octicons'
import Dropdown from '../utils/Dropdown'
import marks from '../thunks/marks'
import routesActions from '../actions/routes'

const mapStateToProps = ({class: loadedClass, marks, teacher, me, location }) => ({ loadedClass, marks, teacher, me, location })
const mapDispatchToProps = dispatch => ({
  postMark: (data) => dispatch(marks.postMark(data)),
  putMark: (id, data) => dispatch(marks.putMark(id, data)),
  goToForbidden: () => dispatch(routesActions.goToForbidden())
})

class Class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dates: [],
      filteredStudents: [],
      loadedClass: {},
      searchData: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.me.data && nextProps.me.data.role !== 'teacher') {
      nextProps.goToForbidden()
      return null
    }
    if (nextProps.teacher.data && nextProps.loadedClass.data &&
      !nextProps.teacher.data.classes.map(c => c.id).includes(nextProps.loadedClass.data.id)) {
        nextProps.goToForbidden()
        return null
    }
    if (nextProps.loadedClass.data && nextProps.marks.data && nextProps.teacher.data) {
      return Class.getMarksTable(nextProps, prevState)
    }
    return null
  }

  onChange = (e) => {
    const { students } = this.props.loadedClass.data
    let filteredStudents = students
      .filter(entity => entity.name.toLowerCase().includes(e.target.value.toLowerCase()))
      .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
    this.setState({
      searchData: e.target.value,
      filteredStudents
    })
  }

  static getMarksTable = (props, state) => {
    const {
      loadedClass: { data: loadedClass },
      marks: { data: { entities: marks }},
      teacher: { data: teacher}
    } = props

    const classStudentsIds = loadedClass.students.map(student => student.id)
    let filteredMarks = marks
      .filter(mark =>
        classStudentsIds.includes(mark.student.id) &&
        loadedClass.id === mark.class.id &&
        teacher.subject.id === mark.subject.id
      )
      .sort((a, b) => a.id - b.id)
    let filteredStudents = loadedClass.students
      .filter(student => student.name.toLowerCase().includes(state.searchData.toLowerCase()))
      .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
      .map(student => {
        student.marks = filteredMarks.filter(mark => student.id === mark.student.id)
        return student
      })
    let dates = [...new Set(filteredMarks.map(mark => mark.date))]
    
    return { dates, filteredStudents, loadedClass }
  }

  addMark = (value, student_id) => {
    this.props.postMark({value, student_id})
  }

  updateMark = (value, id) => {
    this.props.putMark(id, { value })
  }

  render () {
    // prevent flickering
    if (this.props.loadedClass.data && this.props.location.payload.id !== this.props.loadedClass.data.id)
      return null

    const { dates, filteredStudents, loadedClass } = this.state
    return (
      <div>
        <h5><strong>{loadedClass.name}</strong> class students:</h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
         <div className={styles.tableWrapper}>
           <table className="u-full-width">
             <thead>
             <tr>
               <th className={styles.addMarkColumn}>Add mark</th>
               <th className={styles.nameColumn}>Name</th>
               { dates && dates.map(date => <th key={date}>{date}</th>)}
             </tr>
             </thead>
             <tbody>
             {
               filteredStudents && filteredStudents.map(student =>
                 <tr key={student.id}>
                   <td style={{textAlign: 'center'}}>
                     <Dropdown items={[2, 3, 4, 5]}
                               activeStyles={{boxShadow: '0px 0px 5px 1px rgba(10, 140, 255, 0.6)', borderRadius: '4px'}}
                               position='right' onPick={(value) => this.addMark(value, student.id)}>
                       <button className={`button-primary ${styles.addMarkButton}`}>
                        <PlusIcon/>
                       </button>
                     </Dropdown>
                   </td>
                   <td>{student.name}</td>
                   {
                     dates && dates.map(date =>
                       <td key={date}><div>
                         { student.marks && student.marks
                           .filter(mark => mark.date === date)
                           .map((mark, i, a) =>
                             <span key={mark.id}>
                               <Dropdown items={[2, 3, 4, 5]}
                                         activeStyles={{color: '#007afb', fontWeight: 'bold'}}
                                         onPick={(value) => this.updateMark(value, mark.id)}>
                                 <span title='Click to edit mark'
                                       style={{padding: '0 5px', fontSize: '17px'}}>
                                   {mark.value}
                                 </span>
                               </Dropdown>
                               {i < a.length - 1 ? ' / ' : ''}
                             </span>)
                         }
                       </div></td>
                     )
                   }
                 </tr>
               )
             }
             </tbody>
           </table>
         </div>
      </div>
    )
  }
}

Class.propTypes = {
  loadedClass: PropTypes.object.isRequired,
  marks: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  postMark: PropTypes.func.isRequired,
  putMark: PropTypes.func.isRequired,
  goToForbidden: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Class)
