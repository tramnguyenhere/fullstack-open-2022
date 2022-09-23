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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
  const handleBlogAdd = async () => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await BlogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));
      setAuthor('');
      setTitle('');
      setUrl('');
      setMessage(`a new blog "${blog.title}" by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  //---

  //Blog form section
  const blogFormRef = useRef();
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
            <button onClick={handleLogOut}>logout</button>
          </div>
          <div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <CreateBlog
                handleBlogAdd={handleBlogAdd}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
              />
            </Togglable>
          </div>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
