Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url,
      likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  });
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('checkBlogOrder', (classLikes) => {
  cy.get(classLikes).filter(':visible').then(($listOfLikes) => {
    let likeValues = [];
    $listOfLikes.each((i) => {
      likeValues.push(parseInt($listOfLikes[i].textContent.split(' ')[1]));
    });
    let ascendingLikes = [...likeValues].sort((a, b) => a - b);
    let descendingLikes = [...likeValues].sort((a, b) => b - a);
    expect(
      likeValues
    ).to.have.ordered.members(
      descendingLikes
    ).but.not.have.ordered.members(
      ascendingLikes
    );
  });
});
