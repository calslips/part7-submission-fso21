describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test City',
      username: 'clogtheblog',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('log in to application');
    cy.get('form').should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('clogtheblog');
      cy.get('#password').type('test');
      cy.get('form').submit();

      cy.get('.notice').should('contain', 'logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('p').should('include.text', 'logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('clogtheblog');
      cy.get('#password').type('wrongpass');
      cy.get('form').submit();

      cy.get('.notice').should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('h2').should('contain', 'log in to application');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'clogtheblog', password: 'test' });
    });

    it('A blog can be created', function() {
      cy.contains('create new blog').click();
      cy.get('#title').type('Test Title');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('https://blog.testblog.com');
      cy.get('form').submit();

      cy.get('.notice').should('include.text', 'added');
      cy.get('.blog').should('contain', 'Test Title - Test Author');
    });

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Persist',
        author: 'Rando Man',
        url: 'https://bloglife.com'
      });
      cy.createBlog({
        title: 'More To Add',
        author: 'Juan Plause',
        url: 'https://www.blogaddition.org'
      });
      cy.createBlog({
        title: 'Must Blog On',
        author: 'Blogging Blogger',
        url: 'https://www.foreverblog.net'
      });

      cy.get('.lessInfo').contains('More To Add').contains('view').click();
      cy.get('.moreInfo').contains('More To Add').parent().as('blogToLike');
      cy.get('@blogToLike').contains('likes 0');
      cy.get('@blogToLike').contains('like').click();
      cy.get('@blogToLike').contains('likes 1');
    });

    it('A blog can be removed by its creator', function() {
      cy.createBlog({
        title: 'Persist',
        author: 'Rando Man',
        url: 'https://bloglife.com'
      });
      cy.createBlog({
        title: 'Shortlived',
        author: 'Minute Man',
        url: 'https://toblogornottoblog.info'
      });
      cy.createBlog({
        title: 'Must Blog On',
        author: 'Blogging Blogger',
        url: 'https://www.foreverblog.net'
      });

      cy.get('.lessInfo').contains('Shortlived').contains('view').click();
      cy.get('.moreInfo').contains('Shortlived').parent().contains('remove').click();
      cy.get('.notice').contains('Removed blog \'Shortlived\' by Minute Man');
      cy.get('.blog').should('not.contain', 'Shortlived');
    });

    it('A blog cannot be removed by another user', function() {
      const newUser = {
        name: 'Gummy Flapper',
        username: 'noremoval',
        password: 'womp'
      };
      cy.request('POST', 'http://localhost:3003/api/users', newUser);

      cy.createBlog({
        title: 'U Can\'t Touch This',
        author: 'MC Hammer',
        url: 'https://blogsong.biz'
      });

      cy.contains('logout').click();
      cy.login({ username: 'noremoval', password: 'womp' });

      cy.get('.lessInfo').contains('U Can\'t Touch This').contains('view').click();
      cy.get('.moreInfo').contains('U Can\'t Touch This').parent().as('unremovableBlog');
      cy.get('@unremovableBlog').should('not.contain', 'remove');
    });

    it('blogs are listed by likes in descending order', function() {
      cy.createBlog({
        title: 'first blog',
        author: 'Arthur I',
        url: 'https://blog.one.com',
        likes: 3
      });
      cy.createBlog({
        title: 'second blog',
        author: 'Beatrice II',
        url: 'https://blog.two.com',
        likes: 5
      });
      cy.createBlog({
        title: 'third blog',
        author: 'Charles III',
        url: 'https://blog.three.com',
        likes: 1
      });
      cy.createBlog({
        title: 'fourth blog',
        author: 'Diana IV',
        url: 'https://blog.four.com',
        likes: 5
      });

      cy.get('.blog').each(() => {
        cy.get('.lessInfo').filter(':visible').contains('view').click();
      });

      cy.checkBlogOrder('.likes');

      cy.get('.moreInfo').contains('fourth').parent().contains('like').click();

      cy.checkBlogOrder('.likes');
    });
  });
});