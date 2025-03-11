class LogoutPage {
    clickLogout() {
        cy.get('button.btn.btn-outline-danger').click(); // Click the logout button
    }
  
    verifyLogout() {
        cy.url().should('include', '/'); // Verify user is redirected to the login page after logout
    }
  
}

export default new LogoutPage();