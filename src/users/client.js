import axios from "axios";
axios.defaults.withCredentials = true;

const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
// export const USERS_API = process.env.REACT_APP_API_URL;
console.log('BASE API URL:', process.env.REACT_APP_BASE_API_URL);
console.log('USERS API URL:', USERS_API);

export const signin = async (credentials) => {
  try {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return { success: true, data: response.data };
  } catch (error) {
    // If the request made it to the server and the server returned a status code
    // that falls out of the range of 2xx, you can get the response here.
    if (error.response) {
      // The server responded with details you can show to the user
      return { success: false, message: error.response.data.message };
    } else if (error.request) {
      // The request was made but no response was received
      return { success: false, message: "No response from the server. Please try again later." };
    } else {
      // Something happened in setting up the request that triggered an error
      return { success: false, message: error.message };
    }
  }
};

fetch('http://localhost:4000/api/users/signin', {
  method: 'POST',
  credentials: 'include', // to match `credentials: true` in your CORS config
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'test', password: 'test' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

export const account = async () => {
  const response = await request.post(`${USERS_API}/profile`);
  return response.data;
};
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};



