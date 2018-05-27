import axios from './index'

const getSubjects = () => axios.get('/subjects')
const getSubject = (id) => axios.get('/subjects/' + id)

export default {
  getSubjects,
  getSubject
}
