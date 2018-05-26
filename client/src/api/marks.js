import axios from './index'

const getMarks = () => axios.get('/marks')
const getMark = (id) => axios.get('/marks/' + id)
const postMark = (data) => axios.post('/marks', data)
const putMark = (id, data) => axios.put('/marks/' + id, data)

export default {
  getMarks,
  getMark,
  postMark,
  putMark
}
