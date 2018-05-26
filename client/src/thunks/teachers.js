import {
  getTeachersRequest,
  getTeachersSuccess,
  getTeachersFailure,
  getTeacherRequest,
  getTeacherSuccess,
  getTeacherFailure
} from '../actions/teachers'
import teachers from '../api/teachers'

const getTeachers = () => dispatch => {
  dispatch(getTeachersRequest())
  teachers.getTeachers()
    .then(response => dispatch(getTeachersSuccess(response.data)))
    .catch((e) => dispatch(getTeachersFailure(e)))
}

const getTeacher = (id) => dispatch => {
  dispatch(getTeacherRequest())
  teachers.getTeacher(id)
    .then(response => dispatch(getTeacherSuccess(response.data)))
    .catch((e) => dispatch(getTeacherFailure(e)))
}

export default {
  getTeachers,
  getTeacher
}
