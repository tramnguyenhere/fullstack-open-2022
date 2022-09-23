import React, { useState } from 'react';
import '../styles/blog.css';
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false);

  const hideWhenVisible = { display: blogDetailVisible ? 'none' : '' };
  const showWhenVisible = { display: blogDetailVisible ? '' : 'none' };

  const handleLikes = (event) => {
    event.preventDefault();
    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, updateBlog);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    deleteBlog(blog.id);
  };
  return (
    <>
      <div style={hideWhenVisible} className='blog-wrapper'>
        <h3>
          {blog.title}
          <button
            className='blog-toggle--button'
            onClick={() => setBlogDetailVisible(true)}
          >
            view
          </button>
        </h3>
      </div>

      <div style={showWhenVisible} className='blog-wrapper'>
        <p>
          Posted by {blog.author} on {blog.date.split('T')[0]}
          <button
            className='blog-toggle--button'
            onClick={() => setBlogDetailVisible(false)}
          >
            hide
          </button>
        </p>
        <h3>{blog.title}</h3>
        <a className='like' href={blog.url}>
          {blog.url}
        </a>
        <span className='like-wrapper'>
          <p>likes</p>
          <p> {blog.likes}</p>
          <button className='blog-toggle--button__like' onClick={handleLikes}>
            <i className='fa-solid fa-thumbs-up'></i>
          </button>
        </span>
        <button className='blog-delete--button' onClick={handleDelete}>
          delete
        </button>
      </div>
    </>
  );
};

export default Blog;
