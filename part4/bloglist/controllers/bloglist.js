const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');

bloglistRouter.get('/', (request, response) => {
  Blog.find({}).then((bloglist) => {
    response.json(bloglist);
  });
});

bloglistRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((item) => {
    response.status(201).json(item);
  });
});

module.exports = bloglistRouter;
