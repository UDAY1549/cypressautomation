class SignupPage {

    visit() {
        cy.visit('http://localhost:8080/#/');
    }

    //Sign up
    clickSignup() {
        cy.contains('a.nav-link', 'Sign up') 
          .should('be.visible') 
          .click({ force: true }); 
          cy.log('Clicked on Sign up');
      }
    
    enterUsername(username) {
        cy.get('input[placeholder="Username"]').should('be.visible').type(username);
    }

    enterEmail(email) {
        cy.get('input[placeholder="Email"]').should('be.visible').type(email);
    }

    enterPassword(password) {
        cy.get('input[placeholder="Password"]').should('be.visible').type(password, { log: false });
    }

    clickSignupAgain() {
        cy.get('button.btn.btn-lg.btn-primary.pull-xs-right').click();
    }

    // Verify user is redirected to the homepage
    verifyHomePage() {
        cy.url().should('include', '/'); 
    }
}

export default new SignupPage();