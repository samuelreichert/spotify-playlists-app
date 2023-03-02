describe('Home page', () => {
  it('should see Spotify Playlists App', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Spotify playlists app').should('be.visible')
  })
})
