import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import userEvent from '@testing-library/user-event';

const blog = {
  author: 'Tram Nguyen',
  title: 'Madness',
  url: 'madness.com',
  likes: 10,
  date: new Date().toISOString(),
  user: {
    username: 'tramnguyen',
    name: 'Tram Nguyen',
  },
};
describe('render author and title', () => {
  test('render author', () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.blog-author');
    expect(div).toHaveTextContent('Tram Nguyen');
  });
  test('render title', () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.blog-title');
    expect(div).toHaveTextContent('Madness');
  });
  test('do not render url and likes', async () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none;');
  });
});

describe('render url and likes after clicking button', () => {
  test('render url and likes after clicking button', async () => {
    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none;');
  });
});

describe('clicking button', () => {
  test('clicking the like button twice calls the event handler twice', async () => {
    const likeMockHandler = jest.fn();
    const container = render(
      <Blog blog={blog} updateLikes={likeMockHandler} />
    );

    const button = container.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
