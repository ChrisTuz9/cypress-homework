describe('Password change', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show error if current password does not match the user’s password', () => {
    cy.login('user@example.com', 'OldPa55word');

    fillPasswordForm({
      current: 'WrongPa55word',
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    });

    getErrorMessageForField('current-password-input')
      .should('have.text', 'The Current Password is incorrect');

    isSubmitButtonDisabled();
  });

  it('should actually update the password', () => {
    cy.login('user@example.com', 'OldPa55word');

    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    });

    submitPasswordForm();

    cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
        username: 'user@example.com',
        password: 'NewPa55word'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });


  it('should disable submit button if current password is empty and untouched', () => {
    fillPasswordForm({
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    })

    isSubmitButtonDisabled();
  })

  it('should show error if current password is empty and touched', () => {
    fillPasswordForm({
      newPass: 'NewPa55word',
      confirm: 'NewPa55word'
    })

    cy.get('[data-cy="current-password-input"]')
      .focus()
      .blur();

    getErrorMessageForField('current-password-input')
      .should('have.text', 'The Current Password is required');

    isSubmitButtonDisabled();
  })

  it('should disable submit button if new password and confirmation are empty and untouched', () => {
    cy.get('[data-cy="current-password-input"]')
        .type('OldPa55word')

    isSubmitButtonDisabled();
  });

  it('should show error if new password is 7 characters long', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55',
      confirm: 'NewPa55'
    })

    getErrorMessageForField('new-password-input')
      .should('have.text', 'The New Password must be at least 8 characters long')
      
    isSubmitButtonDisabled()
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
    
    isSubmitButtonDisabled()
  })

  it('should show error if new password does not contain a number', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPassw',
      confirm: 'NewPassw'
    })

    getErrorMessageForField('new-password-input')
      .should('have.text', 'The New Password must contain at least one number')
    
    isSubmitButtonDisabled()
  })

  it('should show error if confirmation password does not match new password', () => {
    fillPasswordForm({
      current: 'OldPa55word',
      newPass: 'NewPa55word',
      confirm: 'DifPa55word'
    })

    getErrorMessageForField('confirm-new-password-input')
      .should('have.text', 'Passwords do not match')
    isSubmitButtonDisabled();
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

  function isSubmitButtonDisabled() {
    cy.get('[data-cy="submit-button"]')
      .should('be.disabled');
  }
})