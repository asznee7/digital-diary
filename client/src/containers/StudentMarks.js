import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classStyles from './Class.css'
import routesActions from '../actions/routes'

const mapStateToProps = ({ me, subjects, marks, student }) => ({ me, subjects, marks, student })
const mapDispatchToProps = dispatch => ({
  goToForbidden: () => dispatch(routesActions.goToForbidden())
})

class StudentMarks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dates: [],
      filteredMarks: [],
      filteredSubjects: [],
      searchData: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.marks.data && nextProps.subjects.data && nextProps.student.data)
      return StudentMarks.transformProps(nextProps, prevState)
    if (nextProps.me.data && nextProps.me.data.role !== 'student') {
      nextProps.goToForbidden()
      return null
    }
    return null
  }

  static transformProps({ subjects: propSubjects, marks: propMarks, student: propStudent }, state){
    const { data: { entities: marks } } = propMarks
    const { data: { entities: subjects } } = propSubjects
    const { data: student } = propStudent

    let filteredMarks = marks.filter(mark => mark.student.id === student.id)
    let dates = [...new Set(filteredMarks.map(mark => mark.date))].sort((a, b) => a.toUpperCase() < b.toUpperCase() ?  -1 :  1)
    let filteredSubjects = subjects.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ?  -1 :  1)

    return { dates, filteredMarks, filteredSubjects }
  }

  onChange = (e) => {
    const { entities : subjects } = this.props.subjects.data
    let filteredSubjects = subjects.filter(entitiy =>
      entitiy.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      searchData: e.target.value,
      filteredSubjects
    })
  }

  renderRows = (dates, subjects, marks) => {
    if (!dates || !subjects || !marks) return null
    return subjects.map(subject =>
      <tr key={subject.id}>
        <td>{subject.name}</td>
        {
          dates.map(date =>
            <td key={date}>
              <div>
                {
                  marks
                    .filter(mark => mark.date === date && mark.subject.id === subject.id)
                    .map((mark, i, a) =>
                      <span key={i}>
                        {mark.value}{i < a.length - 1 ? ' / ' : ''}
                      </span>
                    )
                }
              </div>
            </td>
          )
        }
      </tr>
    )
  }

  render(){
    const { dates, filteredSubjects: subjects, filteredMarks: marks } = this.state
    return (
      <div>
        <h5>Your marks:</h5>
        <input type='text' className='u-full-width' placeholder='Search...' onChange={(e) => this.onChange(e)}/>
        {
          dates && subjects && marks &&
          <div className={classStyles.tableWrapper}>
            <table className="u-full-width">
              <thead>
                <tr>
                  <th style={{minWidth: '120px'}}>Subject</th>
                  { dates.map(date => <th key={date}>{date}</th>) }
                </tr>
              </thead>
              <tbody>
                {this.renderRows(dates, subjects, marks)}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

StudentMarks.propTypes = {
  subjects: PropTypes.object.isRequired,
  marks: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  goToForbidden: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentMarks)
