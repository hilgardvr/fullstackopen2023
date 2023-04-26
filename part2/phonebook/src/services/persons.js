import axios from 'axios'

function getAll() {
    return axios
        .get('http://localhost:3001/persons')
        .then( (resp) => {
            console.log('promise fulfilled', resp)
            return resp.data
        })
}

const create = (person) => {
    return axios
        .post(`http://localhost:3001/persons`, person)
        .then( (resp) => {
            console.log('promise fulfilled', resp)
            return resp.data
        })
}

const personService = {
    getAll: getAll,
    create: create
};

export default personService;