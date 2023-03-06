describe('Home page', () => {
  before(() => {
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should see Spotify Playlists App', () => {
    cy.contains('Spotify playlists app').should('be.visible')
  })

  it('should fetch playlists', () => {
    cy.get('.accordion').should('have.length', 3)
  })

  it('should be able to change to dark mode', () => {
    cy.get('.theme-toggle-button').click()
    cy.get('body').should('have.class', 'dark')
  })

  // Playlists accordion
  it('should be able to expand playlists', () => {
    cy.get('.accordion-content').should('not.exist')
    cy.get('.accordion').first().click()
    cy.get('.accordion-content').should('be.visible')
  })
})
