import {
  getSubjectsRequest,
  getSubjectsSuccess,
  getSubjectsFailure,
  getSubjectRequest,
  getSubjectSuccess,
  getSubjectFailure
} from '../actions/subjects'
import subjects from '../api/subjects'

const getSubjects = () => dispatch => {
  dispatch(getSubjectsRequest())
  subjects.getSubjects()
    .then(response => dispatch(getSubjectsSuccess(response.data)))
    .catch((e) => dispatch(getSubjectsFailure(e)))
}

const getSubject = (id) => dispatch => {
  dispatch(getSubjectRequest())
  subjects.getSubject(id)
    .then(response => dispatch(getSubjectSuccess(response.data)))
    .catch((e) => dispatch(getSubjectFailure(e)))
}

export default {
  getSubjects,
  getSubject
}
