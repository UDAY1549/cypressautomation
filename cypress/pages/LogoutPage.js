class LogoutPage {
    
    // Click the logout button
    clickLogout() {
        cy.get('button.btn.btn-outline-danger').click(); 
    }
  
    // Verify user is redirected to the login page after logout
    verifyLogout() {
        cy.url().should('include', '/');
    }
  
}

export default new LogoutPage();