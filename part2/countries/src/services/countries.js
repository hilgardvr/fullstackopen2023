import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = () =>  {
   return axios 
    .get(`${baseUrl}/all`)
    .then( (resp) => {
        return resp.data
    })
}

const obj = {
    getAll
}

export default obj
