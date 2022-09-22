import React from 'react';
import '../styles/blog.css';
const Blog = ({ blog }) => {
  return (
    <div className='blog-wrapper'>
      <p>
        Posted by {blog.author} on {blog.date.split('T')[0]}
      </p>
      <h3>{blog.title}</h3>
      <span className='like-wrapper'>
        <i className='fa-solid fa-thumbs-up'></i>
        <p>{blog.likes}</p>
      </span>
    </div>
  );
};

export default Blog;
