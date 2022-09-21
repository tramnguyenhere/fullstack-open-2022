const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(bloglist);
});

bloglistRouter.get('/:id', async (request, response) => {
  const bloglist = await Blog.findById(request.params.id);
  bloglist ? response.json(bloglist) : response.status(404).end();
});

bloglistRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (!body.title && !body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

bloglistRouter.delete('/:id', async (request, response, next) => {
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const deletedBlog = await Blog.findById(request.params.id);

  if (deletedBlog.user._id.toString() === user._id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    return response
      .status(401)
      .json({ error: 'You are not authorized to delete' });
  }
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
