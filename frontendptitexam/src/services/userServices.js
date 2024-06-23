import axios from "axios";

export const loginApi = (user) => {
  return axios.post("http://localhost:9999/api/auth/login", user);
};
export const register = (user) => {
  return axios.post("http://localhost:9999/api/auth/register", user);
};

export async function saveUser(user) {
  try {
    const response = await axios.post(`http://localhost:9999/api/users`, user);
    return response.data;
    // return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to save user:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findOneUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/users/${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return [];
  }
}

export async function findAllUsers() {
  try {
    const response = await axios.get("http://localhost:9999/api/users/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function listAllUsername() {
  try {
    const response = await axios.get(
      "http://localhost:9999/api/users/username"
    );
    return response.data.content; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to find usernames:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
