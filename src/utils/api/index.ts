import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
const baseAPIURL = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}`;
// console.log('Base API URL:', baseAPIURL);
const api = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
  withXSRFToken: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const auth = useAuthStore();

    if (error.response?.status === 401 || error.response?.status === 498) {
      // Perform client-side logout only
      auth.user = null;
      // auth.isAdmin = false;
    }

    return Promise.reject(error);
  }
);
const auth = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
  withXSRFToken: true
});
export { api, auth };
