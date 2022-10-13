import { createSlice } from '@reduxjs/toolkit';
import BlogService from '../services/bloglist';
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    setBlog(state, action) {
      const blog = action.payload;
      return state.map((b) => (b.id === blog.id ? blog : b));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeABlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, setBlog, appendBlog, removeABlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await BlogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await BlogService.update(blog.id, blog);
    dispatch(setBlog(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await BlogService.remove(id);
    dispatch(removeABlog(id));
  };
};

export default blogsSlice.reducer;
