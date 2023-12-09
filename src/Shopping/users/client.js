import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export const PROFILES_API = `${BASE_API}/api/profiles`

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
  };
  
  export const signin = async (credentials) => {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data;
  };
  
  export const signup = async (credentials) => {
    const response = await request.post(`${USERS_API}/signup`, credentials);
    return response.data;
  };
  
  export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
  };
  
  export const account = async () => {
    const response = await request.post(`${USERS_API}/profile`);
    return response.data;
  };
  
  export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
  };
  
  export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
  };
  
  export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
  };
  
  export const deleteUser = async (id) => {
    const response = await request.delete(`${USERS_API}/${id}`);
    return response.data;
  };

  // Function to fetch all user profiles (only usernames)
  export const findAllUserProfiles = async () => {
    const response = await request.get(PROFILES_API);
    return response.data;
  };

  // Function to fetch a specific user's profile by ID
  export const findUserProfileById = async (id) => {
    const response = await request.get(`${PROFILES_API}/${id}`);
    return response.data;
  };