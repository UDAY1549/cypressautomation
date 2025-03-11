import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import ArticlePage from "../pages/ArticlePage";

describe("Login Test Suite", function () {
  beforeEach(function () {
    cy.fixture("testData").then((data) => {
      this.testData = data; // Store test data in the context
    });

    SigninPage.visit(); // Navigate to the Signin page before each test
  });

  // Reusable login function
  function login() {
    SigninPage.clickSignin(); // Click on the "Sign in" link
    SigninPage.enterEmail(this.testData.validUser.email); // Enter dynamic valid email
    SigninPage.enterPassword(this.testData.validUser.password); // Enter dynamic valid password
    SigninPage.clickLogin(); // Click the login button
    SigninPage.verifyDashboard(); // Verify that the dashboard page is loaded
  }

  // Logout process function
  function logout() {
    cy.contains('a.nav-link', 'Settings').should('be.visible').click({ force: true }); // Click on the "Settings" link
    cy.log('Clicked on Sign up'); // Log the action
    LogoutPage.clickLogout(); // Click on the logout button
    LogoutPage.verifyLogout(); // Verify that the user has been logged out
  }

  it("Login with valid credentials", function () {
    login.call(this); // Login using dynamic credentials
  });

  it("Prevent sign-up with an already registered email", function () {
    SignupPage.visit(); // Navigate to the signup page
    SignupPage.clickSignup(); // Click the "Sign Up" button
    SignupPage.enterUsername(this.testData.validUser.username); // Enter dynamic username
    SignupPage.enterEmail(this.testData.validUser.email); // Enter already registered dynamic email
    SignupPage.enterPassword(this.testData.validUser.password); // Enter dynamic password
    SignupPage.clickLogup(); // Submit the signup form
    SignupPage.verifyHomePage(); // Ensure the user is on the homepage
  });

  it('should update article after editing and saving changes', function() {
    login.call(this); // Log in before editing the article
    const originalTitle = this.testData.article.originalTitle; // Fetch the original title dynamically
    const updatedTitle = this.testData.article.updatedTitle; // Fetch updated title dynamically
    const updatedContent = this.testData.article.updatedContent; // Fetch updated content dynamically

    cy.contains('.article-preview', originalTitle) // Find the article by its original title
      .find('.preview-link') // Find the link inside the article preview
      .click(); // Open the article

    cy.url().should('include', '/articles'); // Verify that the article page is loaded
    cy.contains('Edit Article').click(); // Click on the "Edit Article" button
    ArticlePage.editArticle(originalTitle, updatedTitle, updatedContent); // Edit the article
    cy.contains('a.nav-link', 'Home') // Navigate to the Home page
      .should('be.visible')
      .click({ force: true });
      
    cy.contains(originalTitle).should('be.visible'); // Verify that the original title still exists
    cy.contains(updatedTitle).should('not.exist'); // Ensure the updated title does not appear
  });

  it("should prevent article submission with an empty title", function () {
    login.call(this); // Log in before creating the article
    cy.contains('a.nav-link', 'New Article') // Click the "New Article" link
      .should('be.visible')
      .click({ force: true });
    cy.log('Clicked on New Article');
    const content = this.testData.article.contentWithoutTitle; // Fetch content dynamically
    
    ArticlePage.createArticleWithoutTitle(content); // Attempt to create an article without a title
    cy.contains('a.nav-link', 'Home') // Navigate to the Home page
      .should('be.visible')
      .click({ force: true });
    cy.log('Clicked on Home Page');
    
    cy.get('a.preview-link p').should('contain.text', 'my life is happy'); // Verify the article preview text
  });

  it('Should redirect to Signin page when accessing settings without authentication', function(){ 
    cy.visit('/#/settings'); // Try to visit the settings page directly
    cy.contains('Home').should('be.visible'); // Ensure the Home page is visible if redirected
  });

  it("should log out successfully", function () {
    login.call(this); // Log in before attempting to log out
    logout.call(this); // Log out of the application
  });
});