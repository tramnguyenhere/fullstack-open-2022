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

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

bloglistRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  const updatedBlog = {
    ...body,
    likes: body.likes ? body.likes : 0,
  };
  try {
    const targetUpdatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      { new: true }
    );
    response.json(targetUpdatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = bloglistRouter;
