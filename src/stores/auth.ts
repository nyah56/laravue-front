import { defineStore } from 'pinia';
import { router } from '@/router';
import { api, auth } from '@/utils/api';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: null,
    returnUrl: null
  }),
  persist: true,
  actions: {
    async getUser() {
      try {
        const response = await api.get('/api/user', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('User data:', response.data);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.user = null;
      }
    },
    async login(email: string, password: string) {
      await auth.get('/sanctum/csrf-cookie');
      console.log('Cookie request');
      console.log('Login request:', { email, password });
      await auth.post('/api/login', { email, password });
      // update pinia state
      await this.getUser();
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    async logout() {
      await auth.post('/api/logout');
      this.user = null;
      // localStorage.removeItem('user');
      router.push('/login');
    }
  }
});
