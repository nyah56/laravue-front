import axios from 'axios';

const baseAPIURL = `${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}`;

const api = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
  withXSRFToken: true
});
const auth = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
  withXSRFToken: true
});
export { api, auth };
