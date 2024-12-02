import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://0.0.0.0:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});


// Add an interceptor to include the token in requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  });
export default apiClient;
