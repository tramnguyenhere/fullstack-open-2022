import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleNotification } from '../reducers/notificationReducer';
import '../styles/createblog.css';
const CreateBlog = ({ handleBlogAdd }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();

  const createBlog = (event) => {
    event.preventDefault();
    handleBlogAdd(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: '', author: '', url: '' });
    dispatch(
      handleNotification(
        `a new blog "${newBlog.title}" by ${newBlog.author} added`,
        5
      )
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };
  return (
    <div className='formDiv'>
      <h3 className='create-blog--title'>Create new</h3>
      <div className='create-blog'>
        <form onSubmit={createBlog}>
          <div className='blog-form--wrapper'>
            title:
            <input
              id='title'
              name='title'
              type='text'
              value={newBlog.title}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className='blog-form--wrapper'>
            author:
            <input
              id='author'
              name='author'
              type='text'
              value={newBlog.author}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className='blog-form--wrapper'>
            url:
            <input
              id='url'
              name='url'
              type='text'
              value={newBlog.url}
              onChange={handleInputChange}
            ></input>
          </div>
          <button className='create-blog--button' type='submit'>
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
