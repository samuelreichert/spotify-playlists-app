describe('Home page', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
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

  it('should be able to see tracks', () => {
    cy.get('.accordion-summary').first().click()
    cy.get('.tracks-list').should('be.visible')
    cy.get('.track').should('have.length', 20)
  })

  it('should be able to show artist details', () => {
    cy.get('.accordion-summary').first().click()
    cy.get('.artist').should('not.exist')
    cy.get('.track-artist').first().click()
    cy.get('.artist').should('be.visible')
    cy.get('.artist-name').should('be.visible')
  })

  it('should be able to close artist details', () => {
    cy.get('.accordion-summary').first().click()
    cy.get('.artist').should('not.exist')
    cy.get('.track-artist').first().click()
    cy.get('.artist').should('be.visible')
    cy.get('.artist-name').should('be.visible')
    cy.get('.close').first().click()
    cy.get('.artist').should('not.exist')
  })
})
