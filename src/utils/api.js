import axios from "axios";

axios.defaults.withCredentials = true;

// Set baseURL depending on the platform
// Use http://10.0.2.2:8000 for Android emulator, http://localhost:8000 for iOS or physical devices on the same network
export const baseURL = "http://localhost:8000/api";

// Create an Axios instance
const api = axios.create({
  baseURL,
  timeout: 10000, // optional: sets a 10-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the Axios instance
export default api;
