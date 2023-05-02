import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () =>  {
    return axios
        .get(baseUrl)
        .then( (resp) => {
            return resp.data
        })
}

const get = (id) => {
    return axios
        .get(`${baseUrl}/${id}`)
        .then(resp => resp.data)
}

const create = (person) => {
    return axios
        .post(baseUrl, person)
        .then( (resp) => {
            return resp.data
        })
}

const update = (existingId, person) => {
    return axios
        .put(`${baseUrl}/${existingId}`, person)
        .then(resp => resp.data)
}

const deleteNumber = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(resp => {
            return resp.data
        })
}

const personService = {
    get,
    getAll,
    create,
    update,
    deleteNumber,
}

export default personService;