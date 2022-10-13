import React from 'react';
import '../styles/blog.css';
import Togglable from './Togglable';
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  return (
    <div className='blog'>
      <div className='blog-wrapper'>
        <p className='blog-author'>
          Posted by {blog.author} on {blog.date.split('T')[0]}
        </p>
        <h3 className='blog-title'>{blog.title}</h3>
      </div>

      <Togglable buttonLabel='view' buttonLabelClose='hide'>
        <div className='blog-wrapper-extend'>
          <a href={blog.url}>{blog.url}</a>
          <span className='like-wrapper'>
            <p>likes</p>
            <p id='show-like'> {blog.likes}</p>
            <button
              className='blog-toggle--button__like'
              onClick={() => updateLikes(blog.id)}
            >
              <i className='fa-solid fa-thumbs-up'> like</i>
            </button>
          </span>
          <button
            className='blog-delete--button'
            onClick={() => deleteBlog(blog.id)}
          >
            delete
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
