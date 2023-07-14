import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () =>  {
   return axios 
    .get(`${baseUrl}/all`)
    .then( (resp) => {
        console.log('all', resp.data)
        return resp.data
    })
}

const get = async (name) =>  {
   return axios 
    .get(`${baseUrl}/name/${name}`)
    .then( (resp) => {
        return resp.data
    })
}

const obj = {
    get,
    getAll,
}

export default obj
