describe('', () => {

  it('', () => {
    cy.visit('https://phone-test.rd.np.bwise.net/bwise/')

    cy.get('#username')
      .type('harsh')

    cy.get('#password')
      .type('L@baD1ena123')

    cy.get('#okButton')
      .click()

    cy.get('[data-w-id="framework"]')
      .click()

    cy.get('[data-w-id="addNewProcess"]')
      .click()

    cy.get('[data-w-id="name"]')
      .find('input')
      .type('Amazing Process for 2nd Interview')

    cy.get('[data-w-id="division"]')
      .click()
      .get('[data-w-id="SDDivision-1570964"]')
      .click()

    cy.get('[data-w-id="description"]')
      .find('p')
      .type('This process is used to test candidates cypress skills 😊,\n')

    cy.get('[data-w-id="timestamp"]')
      .click()

    cy.get('[data-w-id="update"]')
      .click()

    cy.contains('Amazing Process for 2nd Interview')
      .should('be.visible')
  })
})