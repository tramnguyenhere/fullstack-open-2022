import React from 'react';
import '../styles/createblog.css';
const CreateBlog = ({
  handleBlogAdd,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <>
      <h3 className='create-blog--title'>Create new</h3>
      <div className='create-blog'>
        <form onSubmit={handleBlogAdd}>
          <div className='blog-form--wrapper'>
            title:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className='blog-form--wrapper'>
            author:
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
          </div>
          <div className='blog-form--wrapper'>
            url:
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></input>
          </div>
          <button className='create-blog--button' type='submit'>
            create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
