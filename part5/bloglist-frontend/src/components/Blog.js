import React from 'react';
import '../styles/blog.css';
import Togglable from './Togglable';
const Blog = ({ blog, updateLikes, deleteBlog }) => {
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
      <div className='blog-wrapper'>
        <p className='blog-author'>
          Posted by {blog.author} on {blog.date.split('T')[0]}
        </p>
        <h3 className='blog-title'>{blog.title}</h3>
      </div>

      <Togglable buttonLabel='view' buttonLabelClose='hide'>
        <div className='blog-wrapper-extend'>
          <a className='like' href={blog.url}>
            {blog.url}
          </a>
          <span className='like-wrapper'>
            <p>likes</p>
            <p> {blog.likes}</p>
            <button className='blog-toggle--button__like' onClick={handleLikes}>
              <i className='fa-solid fa-thumbs-up'> like</i>
            </button>
          </span>
          <button className='blog-delete--button' onClick={handleDelete}>
            delete
          </button>
        </div>
      </Togglable>
    </>
  );
};

export default Blog;
