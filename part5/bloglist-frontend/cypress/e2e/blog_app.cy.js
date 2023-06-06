describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login page is shown', () => {
    // cy.visit('https://example.cypress.io')
  })

})