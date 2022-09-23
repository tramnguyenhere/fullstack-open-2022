import React, { useState } from 'react';
import '../styles/blog.css';
const Blog = ({ blog }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false);
  const hideWhenVisible = { display: blogDetailVisible ? 'none' : '' };
  const showWhenVisible = { display: blogDetailVisible ? '' : 'none' };
  return (
    <>
      <div style={hideWhenVisible} className='blog-wrapper'>
        <h3>{blog.title}</h3>
        <button
          className='blog-toggle--button'
          onClick={() => setBlogDetailVisible(true)}
        >
          view
        </button>
      </div>

      <div style={showWhenVisible} className='blog-wrapper'>
        <p>
          Posted by {blog.author} on {blog.date.split('T')[0]}
        </p>
        <h3>{blog.title}</h3>
        <a className='like' href={blog.url}>
          {blog.url}
        </a>
        <span className='like-wrapper'>
          <p>likes</p>
          <p> {blog.likes}</p>
          <button className='blog-toggle--button__like'>
            <i className='fa-solid fa-thumbs-up'></i>
          </button>
        </span>
        <button
          className='blog-toggle--button'
          onClick={() => setBlogDetailVisible(false)}
        >
          hide
        </button>
      </div>
    </>
  );
};

export default Blog;
