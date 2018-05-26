import {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentRequest,
  getStudentSuccess,
  getStudentFailure
} from '../actions/students'
import students from '../api/students'

const getStudents = () => dispatch => {
  dispatch(getStudentsRequest())
  students.getStudents()
    .then(response => dispatch(getStudentsSuccess(response.data)))
    .catch((e) => dispatch(getStudentsFailure(e)))
}

const getStudent = (id) => dispatch => {
  dispatch(getStudentRequest())
  students.getStudent(id)
    .then(response => dispatch(getStudentSuccess(response.data)))
    .catch((e) => dispatch(getStudentFailure(e)))
}

export default {
  getStudents,
  getStudent
}
