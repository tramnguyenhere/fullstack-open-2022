import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogService from './services/bloglist';
import LoginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    BlogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      BlogService.setToken(user.token);
    }
  }, []);

  //Authentication section
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await LoginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      BlogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('ERROR! wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser', JSON.stringify(user));
    BlogService.setToken(null);
    setUser(null);
  };
  //---
  //Blog events section
  const handleBlogAdd = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await BlogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));

      setMessage(`a new blog "${title}" by ${author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage(`ERROR! ${error.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  //---

  //Blog form section
  const blogFormRef = useRef();

  const updateLikes = async (id, updateBlog) => {
    try {
      const updatedBlog = await BlogService.update(id, updateBlog);
      const newBlog = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlog);
    } catch (error) {
      setMessage(`ERROR! ${error.response.data.error}`);
    }
  };

  const sortedBloglist = blogs.sort((a, b) => b.likes - a.likes);

  const deleteBlog = async (id) => {
    try {
      const deletedBlog = blogs.filter((blog) => blog.id === id);
      const blogTitle = deletedBlog[0].title;
      const blogAuthor = deletedBlog[0].author;
      if (window.confirm(`Remove ${blogTitle} by ${blogAuthor} ?`)) {
        await BlogService.remove(id);
        setMessage(`${blogTitle} by ${blogAuthor} was successfully deleted`);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setTimeout(() => {
          setMessage(null);
        }, 7000);
      }
    } catch (error) {
      setMessage('ERROR! You are not authorized to delete this post');
    }
  };

  //---

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <div className='logged-user'>
            <p>{user.name} logged in</p>
            <button id='logout' onClick={handleLogOut}>
              logout
            </button>
          </div>
          <div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <CreateBlog handleBlogAdd={handleBlogAdd} />
            </Togglable>
          </div>
          <ul>
            {sortedBloglist.map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  deleteBlog={deleteBlog}
                  updateLikes={updateLikes}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
