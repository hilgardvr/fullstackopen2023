import axios from 'axios'
const baseUrl = '/api/login'


const login = async (username, password) => {
    const body = {
        username: username,
        password: password,
    }
    const res = await axios.post(baseUrl, body)
    return res.data
}

const ex = {
    login
}

export default ex