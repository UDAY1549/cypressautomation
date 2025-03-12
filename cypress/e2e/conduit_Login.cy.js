import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import ArticlePage from "../pages/ArticlePage";

//Test suite 
describe("Login Test Suite", function () {
  beforeEach(function () {
    cy.fixture("testData").then((data) => {
      this.testData = data;
    });

    SigninPage.visit(); 
  });

  // Reusable login function
  function login() {
    SigninPage.clickSignin();
    SigninPage.enterEmail(this.testData.validUser.email); 
    SigninPage.enterPassword(this.testData.validUser.password);
    SigninPage.clickLogin();
    SigninPage.verifyDashboard();
  }

  // Logout process function
  function logout() {
    cy.contains('a.nav-link', 'Settings').should('be.visible').click({ force: true });
    cy.log('Clicked on Sign up');
    LogoutPage.clickLogout();
    LogoutPage.verifyLogout();
  }

  //Login process
  it("Login with valid credentials", function () {
    login.call(this); 
  });

  //sign-up with an already registered email
  it("Prevent sign-up with an already registered email", function () {
    SignupPage.visit(); 
    SignupPage.clickSignup(); 
    SignupPage.enterUsername(this.testData.validUser.username);
    SignupPage.enterEmail(this.testData.validUser.email);
    SignupPage.enterPassword(this.testData.validUser.password);
    SignupPage.clickSignupAgain();
    SignupPage.verifyHomePage();
  });

  //editing the article
  it('should update article after editing and saving changes', function() {
    login.call(this);
    const originalTitle = this.testData.article.originalTitle; 
    const updatedTitle = this.testData.article.updatedTitle; 
    const updatedContent = this.testData.article.updatedContent;

    cy.contains('.article-preview', originalTitle) 
      .find('.preview-link') 
      .click(); 

    cy.url().should('include', '/articles'); 
    cy.contains('Edit Article').click();
    ArticlePage.editArticle(originalTitle, updatedTitle, updatedContent);
    cy.contains('a.nav-link', 'Home') 
      .should('be.visible')
      .click({ force: true });
      
    cy.contains(originalTitle).should('be.visible'); 
    cy.contains(updatedTitle).should('not.exist');
  });

  //create new article without title
  it("should prevent article submission with an empty title", function () {
    login.call(this); 
    cy.contains('a.nav-link', 'New Article') 
      .should('be.visible')
      .click({ force: true });
    cy.log('Clicked on New Article');
    const content = this.testData.article.contentWithoutTitle; 
    
    ArticlePage.createArticleWithoutTitle(content); 
    cy.contains('a.nav-link', 'Home') 
      .should('be.visible')
      .click({ force: true });
    cy.log('Clicked on Home Page');
    
    cy.get('a.preview-link p').should('contain.text', 'my life is happy'); 
  });

  //access setting page directly without login into application
  it('Should redirect to Signin page when accessing settings without authentication', function(){ 
    cy.visit('/#/settings'); 
    cy.contains('Home').should('be.visible'); 
  });

  // Log out of the application
  it("should log out successfully", function () {
    login.call(this); 
    logout.call(this); 
  });
});