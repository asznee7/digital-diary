import axios from './index'

const getTeachers = () => axios.get('/teachers')
const getTeacher = (id) => axios.get('/teachers/' + id)

export default {
  getTeachers,
  getTeacher
}
