class ArticlePage {
      
    // Function to create an article with an empty title
      createArticleWithoutTitle(content) {
        cy.get('input[placeholder="Article Title"]').clear();
        cy.get('textarea[placeholder="Write your article (in markdown)"]').type(content);
        cy.contains('Publish Article').click();
    }
     
    // Function to edit an existing article
        editArticle(originalTitle, updatedTitle, updatedContent) {
          cy.get('input[placeholder="Article Title"]')
            .clear()
            .type(updatedTitle); 
          cy.get('textarea[placeholder="Write your article (in markdown)"]')
            .clear()
            .type(updatedContent);  
          cy.get('button[type="submit"].btn-primary') .click(); 
        }  
  }
  
  export default new ArticlePage();  