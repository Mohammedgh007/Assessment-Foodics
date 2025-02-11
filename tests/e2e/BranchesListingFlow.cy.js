describe('Branch Reservations E2E Flow', () => {
  beforeEach(() => {
    // Intercept API calls to the branches endpoint
    cy.intercept('GET', 'https://api.foodics.dev/*/branches*', {
      fixture: 'branches.json'  // You'll need to create this fixture
    }).as('getBranches')

    // Visit the branch reservations page
    cy.visit('/branch-reservations')
  })

  it('displays branches in the reservation list table', () => {
    // Wait for API request to complete
    cy.wait('@getBranches')

    // Check if the table exists
    cy.get('[data-test="reservation-list-table"]').should('exist')

    // Check if table has branches
    cy.get('[data-test="branch-row"]')
      .should('have.length.greaterThan', 0)

    // Verify first branch has required display fields
    cy.get('[data-test="branch-row"]').first().within(() => {
      cy.get('[data-test="branch-name"]').should('not.be.empty')
      cy.get('[data-test="branch-reference"]').should('not.be.empty')
    })
  })
})