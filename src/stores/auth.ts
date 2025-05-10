import { defineStore } from 'pinia';
import { router } from '@/router';
import { api, auth } from '@/utils/api';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
interface User {
  // id: number;
  email: string;
  name: string;
  // role: string;
}
interface Role {
  // id: number;
  email: string;
  name: string;
  role: string;
}
export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: null as User | null,
    // isAdmin: false,
    logoutTimer: null as ReturnType<typeof setTimeout> | null,
    returnUrl: null
  }),
  // persist: true,
  persist: [
    {
      pick: ['user'],
      storage: localStorage
    }
    // {
    //   pick: ['logoutTimer'],
    //   storage: localStorage
    // },
    // {
    //   pick: ['returnUrl'],
    //   storage: localStorage
    // },
    // {
    //   pick: ['isAdmin'],
    //   storage: localStorage
    // }
  ],
  actions: {
    async fetchUser() {
      // this.user = null;
      // if (this.user) return this.user;
      try {
        const response = await api.get('/api/user', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        // console.log('User data:');
        const { name, email, role } = response.data.data;
        // this.isAdmin = role === 'Admin' ? true : false;

        this.resetLogoutTimer();
        return { name, email, role };
      } catch (error: any) {
        // console.log(error);
        switch (error.response.status) {
          case 401:
            this.user = null;
            console.error('logout');
            break;
        }
      }
    },
    async getUser() {
      if (this.user) return this.user;
      const response: any = await this.fetchUser();
      this.user = { email: response.email, name: response.name };
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
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
      }
      try {
        await auth.post('/api/logout');
        this.user = null;
        this.returnUrl = null;
        // this.isAdmin = false;
        // localStorage.removeItem('user');
        router.push('/login');
      } catch (error) {
        console.error('Credential invalidated');
        this.user = null;
        router.push('/login');
      }
    },
    resetLogoutTimer() {
      if (this.logoutTimer) clearTimeout(this.logoutTimer);

      // Auto logout after 15 minutes (900000 ms)
      this.logoutTimer = setTimeout(
        async () => {
          try {
            await this.getUser(); // test if backend is reachable
            this.logout(); // backend is alive → proceed with logout
          } catch (error) {
            // console.warn('⚠️ Auto-logout failed to reach backend. Just clearing user.');
            this.user = null; // backend unreachable → clear user only
          }
        },
        15 * 60 * 1000
      );
      // console.log('🆕 Logout timer set for 11 minutes:', this.logoutTimer);
    }
  }
});
