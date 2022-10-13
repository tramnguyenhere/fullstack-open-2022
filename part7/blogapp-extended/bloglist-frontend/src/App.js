import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogService from './services/bloglist';
import LoginService from './services/login';
import { handleNotification } from './reducers/notificationReducer';
import {
  createBlog,
  initializeBlogs,
  likeBlog,
  removeBlog,
} from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();

  const allBlogs = useSelector((state) => state.blogs);
  const allUsers = useSelector((state) => state.users);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      BlogService.setToken(user.token);
    }
  }, []);
  console.log(allBlogs);
  console.log(allUsers);

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
      dispatch(createBlog({ title, author, url }));
      dispatch(
        handleNotification(`a new blog "${title}" by ${author} added`, 5)
      );
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

  const updateLikes = (id) => {
    const theBlog = allBlogs.find((b) => b.id === id);
    dispatch(likeBlog(theBlog));
  };

  const deleteBlog = (id) => {
    try {
      const theBlog = allBlogs.find((b) => b.id === id);
      if (window.confirm(`Remove ${theBlog.title} by ${theBlog.author} ?`)) {
        dispatch(removeBlog(id));
        dispatch(
          handleNotification(
            `${theBlog.title} by ${theBlog.author} was successfully deleted`,
            5
          )
        );
      }
    } catch (error) {
      setMessage('ERROR! You are not authorized to delete this post');
    }
  };

  const margin = {
    margin: 10,
  };

  const sortedBloglist = [...allBlogs].sort((a, b) => b.likes - a.likes);

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
          <h2 style={margin}>Users</h2>
          {allUsers.map((user) => (
            <div style={margin} key={user.id}>
              <h4>
                {user.name}: blog created {user.blogs.length}
              </h4>
            </div>
          ))}
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
