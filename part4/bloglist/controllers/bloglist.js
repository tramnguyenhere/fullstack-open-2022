const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');

bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({});
  response.json(bloglist);
});

bloglistRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = bloglistRouter;
