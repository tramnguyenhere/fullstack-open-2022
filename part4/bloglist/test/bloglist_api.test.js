const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('../test/test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('the inital bloglist are returned correctly', () => {
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
});

test('id as unique identifier of a blog', async () => {
  const response = await api.get('/bloglist/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

describe('adding a blog', () => {
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

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Go To Statements Considered Harmful');
    const authors = blogsAtEnd.map((blog) => blog.author);
    expect(authors).toContain('Edsger W. Dijkstraa');
    const urls = blogsAtEnd.map((blog) => blog.url);
    expect(urls).toContain(
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

    const response = await api.get('/bloglist/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('delete a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = await blogsAtStart[0];

    await api.delete(`/bloglist/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('update a blog', () => {
  test('succeeds updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 200,
    };

    await api
      .put(`/bloglist/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const blogAfterUpdate = blogsAtEnd[0];

    expect(blogAfterUpdate.likes).toBe(updatedBlog.likes);
  });
});

//Test creating a user
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });
  test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'tramnguyen',
      name: 'Tram Nguyen',
      password: '123456',
    };

    await api
      .post('/bloglist/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
  test('creation fails with a proper statuscode and message if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'Admin',
      password: '123456',
    };
    const result = await api
      .post('/bloglist/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test('creation fails with a proper statuscode and message if username or password is missing', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: '',
      name: '',
      password: '',
    };
    const result = await api
      .post('/bloglist/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username or password is missing');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
