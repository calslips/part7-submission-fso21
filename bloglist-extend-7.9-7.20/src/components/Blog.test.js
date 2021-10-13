import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let user;
  let blog;
  let component;

  beforeEach(() => {
    user = {
      name: 'Yuge Phan',
      username: 'cantbloqtheblog'
    };
    blog = {
      title: 'The Blog of Testing',
      author: 'Incognito Magneto',
      url: 'https://blog.testique.org',
      likes: 1337,
      user: user
    };

    component = render(
      <Blog blog={blog} user={user}/>
    );
  });
  test('renders only the blog title & author initially', () => {
    // const classBlog = component.container.querySelector('.blog');
    // console.log('### initial render:', prettyDOM(classBlog));

    const condensedDiv = component.container.querySelector('.lessInfo');
    expect(condensedDiv).toHaveTextContent(`${blog.title} - ${blog.author}`);
    expect(condensedDiv).not.toHaveStyle('display: none');

    const expandedDiv = component.container.querySelector('.moreInfo');
    expect(expandedDiv).toHaveTextContent(`${blog.url}`);
    expect(expandedDiv).toHaveTextContent(`${blog.likes}`);
    expect(expandedDiv).toHaveStyle('display: none');
  });

  test('also renders url & likes after clicking \'view\' button', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    // const classBlog = component.container.querySelector('.blog');
    // console.log('### view button clicked:', prettyDOM(classBlog));

    const condensedDiv = component.container.querySelector('.lessInfo');
    expect(condensedDiv).toHaveStyle('display: none');

    const expandedDiv = component.container.querySelector('.moreInfo');
    expect(expandedDiv).toHaveTextContent(`${blog.url}`);
    expect(expandedDiv).toHaveTextContent(`${blog.likes}`);
    expect(expandedDiv).not.toHaveTextContent('display: none');
  });
});
