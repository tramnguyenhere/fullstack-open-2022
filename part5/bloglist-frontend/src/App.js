import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogService from './services/bloglist';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    BlogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default App;
