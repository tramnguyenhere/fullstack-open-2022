import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div>
      <p>
        Posted by {blog.author} on {blog.date.split('T')[0]}
      </p>
      <h2>{blog.title}</h2>
    </div>
  );
};

export default Blog;
