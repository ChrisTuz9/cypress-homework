describe('Password change', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('New password is 7 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55',
      confirm: 'NewPa55'
    })

    cy.contains('The New Password must be at least 8 characters long')
    isSubmitButttonDisabled()
  })

  it('New password is 8 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55w',
      confirm: 'NewPa55w'
    })

    submitPasswordForm()
  })

  it('New password is 30 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaa',
      confirm: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaa'
    })

    submitPasswordForm()
  })

  it('New password is 31 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaa',
      confirm: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaa'
    })

    cy.contains('The New Password must be not longer than 30 characters long')
    isSubmitButttonDisabled()
  })

  it('New password does not contain a number', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPassw',
      confirm: 'NewPassw'
    })

    cy.contains('The New Password must contain at least one number')
    isSubmitButttonDisabled()
  })

  it('Confirmation password does not match', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'DifPa55word'
    })

    cy.contains('Passwords do not match')
    isSubmitButttonDisabled();
  })

  it('Shows a sucess alert after submitting valid password change', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    })

    submitPasswordForm()

    cy.get('@alert').should('have.been.calledWith', 'Your password has been successfully changed.');
  })

  function fillPasswordForm({ current, newPass, confirm}) {
    cy.get('[data-cy="current-password-input"]')
      .type(current)
    cy.get('[data-cy="new-password-input"]')
      .type(newPass)
    cy.get('[data-cy="confirm-new-password-input"]')
      .type(confirm)
      .blur();
  }

  function submitPasswordForm() {
    cy.get('[data-cy="submit-button"]')
      .click()
  }

  function isSubmitButttonDisabled() {
    cy.get('[data-cy="submit-button"]')
      .should('be.disabled');
  }
})