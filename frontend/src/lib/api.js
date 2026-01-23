import axios from "axios";

const baseURL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/v1";

// Log the API URL for debugging
console.log("=== API Configuration ===");
console.log("Base URL:", baseURL);
console.log("NEXT_PUBLIC_API_URL env var:", process.env.NEXT_PUBLIC_API_URL);
console.log("========================");

const api = axios.create({
  baseURL: baseURL,
  timeout: 30000, // Increased to 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for CORS
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Response Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error("API Request Failed (No Response):", {
        url: error.config?.url,
        message: error.message
      });
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
