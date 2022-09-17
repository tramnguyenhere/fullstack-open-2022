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

test('id as unique identifier of a blog', async () => {
  const response = await api.get('/bloglist/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('blog can be added', async () => {
  const newBlog = {
    title: 'Go To Statements Considered Harmful',
    author: 'Edsger W. Dijkstraa',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };

  await api
    .post('/bloglist/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((blog) => blog.title);
  expect(title).toContain('Go To Statements Considered Harmful');
  const author = blogsAtEnd.map((blog) => blog.author);
  expect(author).toContain('Edsger W. Dijkstraa');
  const url = blogsAtEnd.map((blog) => blog.url);
  expect(url).toContain(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  );
});

test('blog lacks likes property', async () => {
  const newBlog = {
    title: 'Go To Statements Considered Harmful',
    author: 'Edsger W. Dijkstraa',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };
  await api
    .post('/bloglist/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  const blogLackLikes = blogsAtEnd[blogsAtEnd.length - 1];
  expect(blogLackLikes.likes).toBe(0);
});

test('adding a blog lacks title and url is a bad request', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstraa',
  };

  await api.post('/bloglist/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
