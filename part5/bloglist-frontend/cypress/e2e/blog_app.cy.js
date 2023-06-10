import axios from 'axios'

describe('blog app', async () => {

  const initUsers = [
    {
      "username": "John",
      "name": "John",
      "password": "password123"
    },
    {
      "username": "Peter",
      "name": "Peter",
      "password": "password123"
    }
  ]
  const addUsers = async () => {
    const response = await axios.post("http://localhost:3003/api/users", initUsers[0])
    const response2 = await axios.post("http://localhost:3003/api/users", initUsers[1])
    console.log(response)
  }

  beforeEach(async () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    await addUsers()
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

    describe('when logged in', () => {
      beforeEach(() => {
        addUsers()
        cy.get('.username').type(initUsers[0].username)
        cy.get('.password').type(initUsers[0].password)
        cy.get('.login').click()
      })

      it('can create, like and delete a new blog', () => {
        cy.contains('New blog').click()
        cy.get('.title').type('new title')
        cy.get('.author').type('new author')
        cy.get('.url').type('new url')
        cy.contains('Post').click()
        cy.contains('Posted new blog: new title')
        cy.contains('new blog')
        cy.contains('new author')
      })

      it('can like a blog', () => {
        cy.contains('New blog').click()
        cy.get('.title').type('new title')
        cy.get('.author').type('new author')
        cy.get('.url').type('new url')
        cy.contains('Post').click()
        cy.contains('Posted new blog: new title')
        cy.contains('new blog')
        cy.contains('new author')
        cy.contains('show').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })

      it('can delete a blog', () => {
        cy.contains('New blog').click()
        cy.get('.title').type('new title')
        cy.get('.author').type('new author')
        cy.get('.url').type('new url')
        cy.contains('Post').click()
        cy.contains('Posted new blog: new title')
        cy.contains('new blog')
        cy.contains('new author')
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.contains('Deleted blog: new title')
      })

      it('non creator cannot delete a blog', () => {
        cy.contains('New blog').click()
        cy.get('.title').type('new title')
        cy.get('.author').type('new author')
        cy.get('.url').type('new url')
        cy.get('.postNewBlog').click()
        cy.contains('Posted new blog: new title')
        cy.contains('new blog')
        cy.contains('new author')
        cy.contains('logout').click()
        cy.get('.username').type(initUsers[1].username)
        cy.get('.password').type(initUsers[1].password)
        cy.get('.login').click()
        cy.contains('show').click()
        cy.contains('remove').should('not.exist')
      })

      it('blogs are ordered acoording to likes', () => {
        cy.contains('New blog').click()
        cy.get('.title').type('new title')
        cy.get('.author').type('new author')
        cy.get('.url').type('new url')
        cy.contains('Post').click()
        cy.contains('Posted new blog: new title')
        cy.contains('new blog')
        cy.contains('new author')
        cy.contains('show').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
        cy.contains('like').click()

        cy.contains('New blog').click()
        cy.get('.title').type('new title2')
        cy.get('.author').type('new author2')
        cy.get('.url').type('new url2')

        cy.contains('hide').click()

        cy.get('.postNewBlog').click()
        cy.contains('Posted new blog: new title2')

        cy.get('.blogTitle').eq(0).should('contain', 'new title')
        cy.get('.blogTitle').eq(1).should('contain', 'new title2')
      })
    })
  })



})