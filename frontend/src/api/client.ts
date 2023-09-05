import axios from "axios";

const TOKEN_KEY = "api-token";

const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

client.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
  return config;
});

export default client;
