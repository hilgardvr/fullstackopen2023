import axios from 'axios'

describe('blog app', () => {

  const initUsers = [
      {
          "username": "John",
          "name": "John",
          "password": "password123"
      }, 
  ]
  const addUser = async () => {
    const response = await axios.post("http://localhost:3003/api/users", initUsers[0])
    console.log(response)
  }

  beforeEach(() => {
    addUser()
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login page is shown', () => {
    cy.get('.username')
    cy.get('.password')
    cy.get('.login')
  })

  describe('login', () => {

    it('succeeds with correct creds', () => {
      cy.get('.username').type(initUsers[0].username)
      cy.get('.password').type(initUsers[0].password)
      cy.get('.login').click()
      cy.contains(`Logged in as ${initUsers[0].username}`)
    })

    it('fails with incorrect creds', () => {
      cy.get('.username').type(initUsers[0].username)
      cy.get('.password').type('some-wrong-password')
      cy.get('.login').click()
      cy.contains('Wrong Credentials')
    })


  })

})