import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
// import { prettyDOM } from '@testing-library/dom';

test('<BlogForm /> event handler is called with correct info when creating new blog', () => {
  const addBlog = jest.fn();

  const component = render(
    <BlogForm addBlog={addBlog} />
  );

  const title = component.container.querySelector('#title');
  fireEvent.change(title, {
    target: { value: 'Sleep Blogging' }
  });

  const author = component.container.querySelector('#author');
  fireEvent.change(author, {
    target: { value: 'Narcoleptic Nancy' }
  });

  const url = component.container.querySelector('#url');
  fireEvent.change(url, {
    target: { value: 'https://www.sleepyinseattle.blog' }
  });

  const form = component.container.querySelector('form');
  fireEvent.submit(form);

  // console.log(prettyDOM(form));
  // console.log(addBlog.mock.calls);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('Sleep Blogging');
  expect(addBlog.mock.calls[0][0].author).toBe('Narcoleptic Nancy');
  expect(addBlog.mock.calls[0][0].url).toBe('https://www.sleepyinseattle.blog');
});
