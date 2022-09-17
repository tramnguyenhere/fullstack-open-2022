const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');

bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({});
  response.json(bloglist);
});

bloglistRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title && !body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

module.exports = bloglistRouter;
