import axios from './index'

const getStudents = () => axios.get('/students')
const getStudent = (id) => axios.get('/students/' + id)

export default {
  getStudents,
  getStudent
}
