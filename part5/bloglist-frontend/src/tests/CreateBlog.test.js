import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlog from '../components/CreateBlog';
import userEvent from '@testing-library/user-event';

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  const blogAddMockHandler = jest.fn();

  const user = userEvent.setup();

  const { container } = render(
    <CreateBlog handleBlogAdd={blogAddMockHandler} />
  );

  // eslint-disable-next-line quotes
  const titleInput = container.querySelector("input[name='title']");
  // eslint-disable-next-line quotes
  const authorInput = container.querySelector("input[name='author']");
  // eslint-disable-next-line quotes
  const urlInput = container.querySelector("input[name='url']");
  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'Tester');
  await user.type(authorInput, 'Test adding a new blog');
  await user.type(urlInput, 'www.test.com');
  await user.click(sendButton);

  expect(blogAddMockHandler.mock.calls).toHaveLength(1);
  expect(blogAddMockHandler.mock.calls[0][0]).toBe('Tester');
  expect(blogAddMockHandler.mock.calls[0][1]).toBe('Test adding a new blog');
  expect(blogAddMockHandler.mock.calls[0][2]).toBe('www.test.com');
});
