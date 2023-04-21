describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Fullstack user',
      username: 'user',
      password: '1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('Fullstack user logged in')
    })

    it('fails with wrong password', function () {
      cy.get('#username').type('user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Fullstack user logged in')
      //cy.contains('Fullstack user logged in').should('not.exist')
    })

    it('fails with wrong username', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Fullstack user logged in')
      //cy.contains('Fullstack user logged in').should('not.exist')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'user', password: '1234' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.contains('create new')
        cy.get("[name=title]").type("a new blog")
        cy.get("[name=author]").type("author")
        cy.get("[name=url]").type("http://test.com")
        cy.get("#create-button").click()

        cy.contains("a new blog by author");
      })

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'a new blog',
            author: 'author',
            url: 'http://test.com'
          })
        })

        it('user can like a blog', function () {
          cy.contains("a new blog by author")
          cy.contains('view').click()
          cy.contains('likes 0')
          cy.contains('like').click()
          cy.contains('likes 1')
        })

        it('creator of blog can delete it', function () {
          cy.contains("a new blog by author")
          cy.contains('view').click()
          cy.contains('remove').click()

          cy.contains('a new blog by author').should('not.exist')
        })

        it('blogs are ordered by number of likes', function () {
          cy.createBlog({
            title: 'blog with most likes',
            author: 'author1',
            url: 'http://test1.com'
          })
          cy.createBlog({
            title: 'blog with least likes',
            author: 'author2',
            url: 'http://test2.com'
          })

          cy.get(".blog").eq(1).contains("view").click();
          cy.get(".blog").eq(1).contains("like").click();

          cy.get(".blog").eq(0).should("contain", "blog with most likes by author1");

        })
      })
    })
  })
})