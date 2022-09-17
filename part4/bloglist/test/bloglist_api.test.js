const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../test/test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/bloglist/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs are returned in correct amount', async () => {
  const response = await api.get('/bloglist/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
