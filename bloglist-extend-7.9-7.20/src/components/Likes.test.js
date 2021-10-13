import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Likes from './Likes';

test('<Likes /> calls to event handler equates to button clicks', () => {
  const user = {
    name: 'Yarl Borg',
    username: 'borgblogs'
  };
  const blog = {
    title: 'Blogsistance Is Futile',
    author: 'The Borg',
    url: 'https://www.thecollective.edu',
    likes: 2375000000000,
    user: user
  };
  const updates = jest.fn();

  const component = render(
    <Likes blog={blog} updates={updates} />
  );

  // component.debug();

  const button = component.container.querySelector('button');

  fireEvent.click(button);
  expect(updates.mock.calls).toHaveLength(1);

  fireEvent.click(button);
  expect(updates.mock.calls).toHaveLength(2);
});