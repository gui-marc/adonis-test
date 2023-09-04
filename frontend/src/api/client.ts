import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthToken() {
  delete client.defaults.headers.common["Authorization"];
}

export default client;
