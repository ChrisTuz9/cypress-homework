describe('Password change', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('New password 7 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55',
      confirm: 'NewPa55'
    })

    cy.contains('The New Password must be at least 8 characters long')
    isSubmitButttonDisabled()
  })

  it('New password 8 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55w',
      confirm: 'NewPa55w'
    })

    submitPasswordForm()
  })

  it('New password 31 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaaaaa',
      confirm: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaaaaa'
    })

    cy.contains('The New Password must be not longer than 30 characters long')
    isSubmitButttonDisabled()
  })

  it('New password does not contain number', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPassw',
      confirm: 'NewPassw'
    })

    cy.contains('The New Password must contain at least one number')
    isSubmitButttonDisabled()
  })

  it('The Confirmation Password does not match', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'DifPa55word'
    })

    cy.contains('Passwords do not match')
    isSubmitButttonDisabled();
  })

  function fillPasswordForm({ current, newPass, confirm}) {
    cy.get('[data-cy="current-password-input"]')
      .type(current)
    cy.get('[data-cy="new-password-input"]')
      .type(newPass)
    cy.get('[data-cy="confirm-new-password-input"]')
      .type(confirm)
  }

  function submitPasswordForm() {
    cy.get('[data-cy="submit-button"]')
      .click()
    cy.contains('Your password has beensuccessfully changed.')
  }

  function isSubmitButttonDisabled() {
    cy.get('[data-cy="submit-button"]')
      .should('be.disabled');
  }
})