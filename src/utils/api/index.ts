import axios from 'axios';

// const baseAPIURL = `${import.meta.env.API_HOSTNAME}:${import.meta.env.API_PORT}`;
const baseAPIURL = 'http://localhost:8000';
console.log('Base API URL:', baseAPIURL);
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
