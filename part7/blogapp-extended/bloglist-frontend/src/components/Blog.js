import React from 'react';
import { useDispatch } from 'react-redux';
import { handleNotification } from '../reducers/notificationReducer';
import '../styles/blog.css';
import Togglable from './Togglable';
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const dispatch = useDispatch();

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
  const handleDelete = () => {
    deleteBlog(blog.id);
    dispatch(
      handleNotification(
        `${blog.title} by ${blog.author} was successfully deleted`,
        5
      )
    );
  };
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
            <button className='blog-toggle--button__like' onClick={handleLikes}>
              <i className='fa-solid fa-thumbs-up'> like</i>
            </button>
          </span>
          <button className='blog-delete--button' onClick={handleDelete}>
            delete
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
