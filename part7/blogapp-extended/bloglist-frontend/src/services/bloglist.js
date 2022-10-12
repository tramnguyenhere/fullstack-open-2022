import axios from 'axios';
const baseUrl = '/bloglist/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, blog) => {
  const object = { ...blog, likes: blog.likes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
// eslint-disable-next-line
export default { getAll, setToken, create, update, remove };
