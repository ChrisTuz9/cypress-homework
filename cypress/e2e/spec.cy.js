describe('Password change', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show error if current password is empty, but untouched', () => {
    fillPasswordForm({
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    })

    isSubmitButttonDisabled();
  })

  it('should show error if current password is empty, but touched', () => {
    fillPasswordForm({
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    })

    cy.get('[data-cy="current-password-input"]')
      .focus()
      .blur();

    getErrorMessageForField('current-password-input')
      .should('have.text', 'The Current Password is required');

    isSubmitButttonDisabled();
  })

  it('should show error if new password is 7 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55',
      confirm: 'NewPa55'
    })

    getErrorMessageForField('new-password-input')
      .should('have.text', 'The New Password must be at least 8 characters long')
      
    isSubmitButttonDisabled()
  })

  it('should accept new password with 8 characters', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55w',
      confirm: 'NewPa55w'
    })

    submitPasswordForm()
  })

  it('should accept new password with 30 characters', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaa',
      confirm: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaa'
    })

    submitPasswordForm()
  })

  it('should show error if new password is 31 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaa',
      confirm: 'NewPa55aaaaaaaaaaaaaaaaaaaaaaaa'
    })

    getErrorMessageForField('new-password-input')
      .should('have.text', 'The New Password must be not longer than 30 characters long')
    
    isSubmitButttonDisabled()
  })

  it('should show error if new password does not contain a number', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPassw',
      confirm: 'NewPassw'
    })

    getErrorMessageForField('new-password-input')
      .should('have.text', 'The New Password must contain at least one number')
    
    isSubmitButttonDisabled()
  })

  it('should show error if confirmation password does not match new password', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'DifPa55word'
    })

    getErrorMessageForField('confirm-new-password-input')
      .should('have.text', 'Passwords do not match')
    isSubmitButttonDisabled();
  })

  it('should show success alert after submitting a valid password change', () => {
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
    if (current !== undefined) {
      cy.get('[data-cy="current-password-input"]')
        .type(current)
    }
    cy.get('[data-cy="new-password-input"]')
      .type(newPass)
    cy.get('[data-cy="confirm-new-password-input"]')
      .type(confirm)
      .blur();
  }

  function getErrorMessageForField(dataCySelector) {
    return cy.get(`[data-cy="${dataCySelector}"]`)
      .parent()
      .find('p');
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