import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import BlogService from './services/bloglist';
import LoginService from './services/login';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser', JSON.stringify(user));
    BlogService.setToken(null);
    setUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <h3 className='login-title'>Login to application</h3>
        <form onSubmit={handleLogin}>
          <div className='username'>
            username
            <input
              type='text'
              name='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className='password'>
            password
            <input
              type='password'
              name='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className='login-submit' onClick='submit'>
            login
          </button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <h1>Blog List</h1>

      <Notification errorMessage={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div className='logged-user'>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>logout</button>
          </div>
          {<CreateBlog />}
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
