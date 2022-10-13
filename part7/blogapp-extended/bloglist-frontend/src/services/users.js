import axios from 'axios';
const baseUrl = '/bloglist/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
