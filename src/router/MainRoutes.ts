const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboards/index.vue')
    },

    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    //PRODUCTS ROUTES
    {
      name: 'Products',
      path: '/products',
      component: () => import('@/views/products/index.vue')
    },
    {
      name: 'Products Create',
      path: '/products/create',
      component: () => import('@/views/products/create.vue')
    },
    {
      name: 'Products Edit',
      path: '/products/edit/:id',
      component: () => import('@/views/products/edit.vue')
    },
    {
      name: 'Products Trashed',
      path: '/products/trashed',
      component: () => import('@/views/products/trashed.vue')
    },
    //SUPPLIER ROUTES
    {
      name: 'Supplier',
      path: '/suppliers',
      component: () => import('@/views/supplier/index.vue')
    },
    {
      name: 'Trashed Supplier',
      path: '/suppliers/trashed',
      component: () => import('@/views/supplier/trashed.vue')
    },
    {
      name: 'Create Supplier',
      path: '/suppliers/create',
      component: () => import('@/views/supplier/create.vue')
    },
    {
      name: 'Edit Supplier',
      path: '/suppliers/edit/:id',
      component: () => import('@/views/supplier/edit.vue')
    },
    // Role Route
    {
      name: 'Role',
      path: '/role',
      component: () => import('@/views/role/index.vue'),
      meta: {
        isAdmin: true
      }
    },
    {
      name: 'Create Role',
      path: '/role/create',
      component: () => import('@/views/role/create.vue'),
      meta: {
        isAdmin: true
      }
    },
    {
      name: 'Edit Role',
      path: '/role/edit/:id',
      component: () => import('@/views/role/edit.vue'),
      meta: {
        isAdmin: true
      }
    },
    //User CRUD
    {
      name: 'Create User',
      path: '/user/create',
      component: () => import('@/views/users/create.vue'),
      meta: {
        isAdmin: true
      }
    },
    //Stock CRUD
    {
      name: 'Stock',
      path: '/stocks',
      component: () => import('@/views/stocks/index.vue')
    },
    {
      name: 'Stock Create',
      path: '/stocks/create',
      component: () => import('@/views/stocks/create.vue')
    },
    {
      name: 'Stock Edit',
      path: '/stocks/edit/:id',
      component: () => import('@/views/stocks/edit.vue')
    },
    {
      name: 'Stock Trashed',
      path: '/stocks/trashed',
      component: () => import('@/views/stocks/trashed.vue')
    },
    {
      name: 'Tabler Icons',
      path: '/icons/tabler',
      component: () => import('@/views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Material Icons',
      path: '/icons/material',
      component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue'),
      meta: {
        isAdmin: true
      }
    }
  ]
};

export default MainRoutes;
