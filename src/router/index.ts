import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    PublicRoutes
  ]
});

interface User {
  // Define the properties and their types for the user data here
  // For example:
  id: number;
  name: string;
}

// Assuming you have a type/interface for your authentication store
interface AuthStore {
  user: User | null;
  isAdmin: Boolean;
  returnUrl: string | null;
  logout(): void;
  getUser(): void;
}

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const auth: AuthStore = useAuthStore();

  const isPublicPage = publicPages.includes(to.path);
  const authRequired = !isPublicPage && to.matched.some((record) => record.meta.requiresAuth);
  const adminOnly = authRequired && to.matched.some((record) => record.meta.isAdmin);
  // auth.user = null;
  console.log(auth);
  if (!publicPages) {
    auth.getUser();
  }

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return next('/login');
  }

  // Block non-admin users from admin routes
  if (adminOnly && auth.user && !auth.isAdmin) {
    return next('/dashboard'); // or redirect to a safe fallback
  }

  // Prevent logged-in users from seeing login page
  if (auth.user && to.path === '/login') {
    return next(auth.returnUrl || '/'); // send them back to saved route or home
  }

  next();
});
