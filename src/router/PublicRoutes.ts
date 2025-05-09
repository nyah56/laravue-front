const PublicRoutes = {
  path: '/login3',
  component: () => import('@/views/authentication/LoginPage.vue'), // Or use a simple RouterView wrapper
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Authentication',
      path: '/login',
      component: () => import('@/views/authentication/LoginPage.vue')
    },
    // {
    //   name: 'Login',
    //   path: '/login1',
    //   component: () => import('@/views/authentication/auth/LoginPage.vue')
    // },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/authentication/auth/RegisterPage.vue')
    },
    {
      name: 'Error 404',
      path: '/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
};

export default PublicRoutes;
