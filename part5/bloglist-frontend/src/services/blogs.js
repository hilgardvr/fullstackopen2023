import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const post = async (blog, userToken) => {
  const config = {
    headers: { 
      Authorization: `Bearer ${userToken}`
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const exports = {
  getAll,
  post,
}

export default exports