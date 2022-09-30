describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/bloglist/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        name: 'Tram Nguyen',
        username: 'tramnguyen1410',
        password: 'Tram1234',
      };
      cy.request('POST', 'http://localhost:3003/bloglist/api/users', user);
      cy.visit('http://localhost:3000');
    });
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tramnguyen1410');
      cy.get('#password').type('Tram1234');
      cy.get('.login-submit').click();
      cy.contains('Tram Nguyen logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('tramnguyen1402');
      cy.get('#password').type('Tram1234');
      cy.get('.login-submit').click();
      cy.contains('ERROR! wrong username or password');
      cy.get('.message--error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'Tram Nguyen logged in');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      const user = {
        name: 'Tram Nguyen',
        username: 'tramnguyen1410',
        password: 'Tram1234',
      };
      cy.request('POST', 'http://localhost:3003/bloglist/api/users', user);
      cy.visit('http://localhost:3000');
      cy.get('#username').type('tramnguyen1410');
      cy.get('#password').type('Tram1234');
      cy.get('.login-submit').click();
    });
    it('A blog can be created', function () {
      cy.findByText('new blog').click();
      cy.get('#title').type('A blog added by Cypress');
      cy.get('#author').type('Tram Nguyen');
      cy.get('#url').type('cypress.com');
      cy.get('.create-blog--button').click();

      cy.contains('A blog added by Cypress');
      cy.get('.message--success').should('have.css', 'color', 'rgb(0, 128, 0)');
    });
    describe('Action with a blog', function () {
      beforeEach(function () {
        cy.findByText('new blog').click();
        cy.get('#title').type('A blog added by Cypress');
        cy.get('#author').type('Tram Nguyen');
        cy.get('#url').type('cypress.com');
        cy.get('.create-blog--button').click();
      });
      it('a blog can be liked', function () {
        cy.findByText('view').click();
        cy.get('.blog-toggle--button__like').click();
        cy.get('#show-like').should('contain', '1');
      });
      describe('Delete a blog', function () {
        beforeEach(function () {
          const user = {
            name: 'Phuc Le',
            username: 'phucle1604',
            password: 'Phuc1234',
          };
          cy.request('POST', 'http://localhost:3003/bloglist/api/users', user);
          cy.visit('http://localhost:3000');
        });
        it('a blog can be deleted by the user who created it', function () {
          cy.findByText('view').click();
          cy.findByText('delete').click();
          cy.contains(
            'A blog added by Cypress by cypress.com was successfully deleted'
          );
        });
        it('a blog cannot be deleted by the user who did not create it', function () {
          cy.get('#logout').click();
          cy.get('#username').type('phucle1604');
          cy.get('#password').type('Phuc1234');
          cy.get('.login-submit').click();
          cy.findByText('view').click();
          cy.findByText('delete').click();
          cy.contains('ERROR! You are not authorized to delete this post');
        });
      });
    });
    it('bloglist is sorted', function () {
      cy.findByText('new blog').click();
      cy.get('#title').type('The title with the most likes');
      cy.get('#url').type('cypress.com');
      cy.get('#author').type('Tram Nguyen');
      cy.get('.create-blog--button').click();
      cy.findByText('view').click();
      cy.get('.blog-toggle--button__like')
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click();
      cy.get('#show-like').wait(500).should('contain', '3');
      cy.findByText('new blog').click();
      cy.get('#title').type('The title with the second most likes');
      cy.get('#url').type('cypress.com');
      cy.get('#author').type('Tram Nguyen');
      cy.get('.create-blog--button').click().wait(500);

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes');
      cy.get('.blog')
        .eq(1)
        .should('contain', 'The title with the second most likes');
    });
  });
});
