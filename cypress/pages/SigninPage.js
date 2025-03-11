class SigninPage {
    visit() {
      cy.visit('http://localhost:8080/#/'); // Visit the homepage
    }
  
    clickSignin() {
      cy.contains('a.nav-link', 'Sign in') 
        .should('be.visible') 
        .click({ force: true }); 
        cy.log('Clicked on Sign in');
    }
  
    enterEmail(email) {
      cy.get('input[placeholder="Email"]').should('be.visible').type(email);
  }
    enterPassword(password) {
      cy.get('input[placeholder="Password"]', { timeout: 10000 }) 
        .should('be.visible')
        .type(password, { log: false }); // Hide the password input in the logs
    }
  
    clickLogin() {
      cy.get('button.btn.btn-lg.btn-primary.pull-xs-right')
        .contains('Sign in') 
        .click(); 
    }
  
    verifyDashboard() {
      cy.url().should('include', '/');
    }

  clickLogout() {
      cy.get('button.btn.btn-outline-danger').click();
  }

  // Verify user is redirected to the login page after logout
  verifyLogout() {
      cy.url().should('include', '/'); 
  }

  }
  
  export default new SigninPage();  