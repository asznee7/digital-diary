import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './Class.css'
import { PlusIcon } from 'react-octicons'
import Dropdown from '../utils/Dropdown'
import marks from '../thunks/marks'

const mapStateToProps = ({ class: loadedClass, marks, teacher }) => ({ loadedClass, marks, teacher })
const mapDispatchToProps = dispatch => ({
  postMark: (data) => dispatch(marks.postMark(data)),
  putMark: (id, data) => dispatch(marks.putMark(id, data))
})

class Class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      uniqueDates: [],
      mappedClassStudents: [],
      searchData: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.loadedClass.data) {
      return Class.getMarksTable(nextProps, prevState)
    }
    return null
  }

  onChange = (e) => {
    const { students } = this.props.loadedClass.data
    let newlyDisplayed = students
      .filter(entity => entity.name.toLowerCase().includes(e.target.value.toLowerCase()))
      .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
    this.setState({
      searchData: e.target.value,
      mappedClassStudents: newlyDisplayed
    })
  }

  static getMarksTable = (props, state) => {
    const { loadedClass, marks, teacher } = props
    const classStudents = loadedClass.data.students.map(student => student.id)
    let neededMarks = marks.data.entities
      .filter(mark => classStudents.includes(mark.student.id))
      .filter(mark => loadedClass.data.id === mark.class.id)
      .filter(mark => teacher.data.subject.id === mark.subject.id)
      .sort((a, b) => a.id - b.id)
    let mappedClassStudents = loadedClass.data.students.slice(0)
      .filter(student => student.name.toLowerCase().includes(state.searchData.toLowerCase()))
    mappedClassStudents
      .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)
      .map(student => {
      student.studentMarks = neededMarks.filter(mark => student.id === mark.student.id)
    })
    let uniqueDates = [...new Set(neededMarks.map(mark => mark.date))]
    return { uniqueDates, mappedClassStudents }
  }

  addMark = (value, student_id) => {
    this.props.postMark({value, student_id})
  }

  updateMark = (value, id) => {
    this.props.putMark(id, { value })
  }

  render () {
    const { loadedClass } = this.props
    if (!loadedClass.data)
      return null

    const { uniqueDates, mappedClassStudents } = this.state

    return (
      <div>
        <h5><strong>{this.props.loadedClass.data.name}</strong> class students:</h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
         <div className={styles.tableWrapper}>
           <table className="u-full-width">
             <thead>
             <tr>
               <th className={styles.addMarkColumn}>Add mark</th>
               <th className={styles.nameColumn}>Name</th>
               { uniqueDates && uniqueDates.map(date => <th key={date}>{date}</th>)}
             </tr>
             </thead>
             <tbody>
             {
               mappedClassStudents && mappedClassStudents.map(student =>
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
                     uniqueDates && uniqueDates.map(date =>
                       <td key={date}><div>
                         { student.studentMarks && student.studentMarks
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
  putMark: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Class)
