import { createRouter, createWebHashHistory } from "vue-router";

const routers = [
    {
        path: '/index',
        component: () => import('../pages/index.vue')             
    },
    { path: '/login', name: 'login', component: () => import('../pages/login.vue') }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routers
  })
  
  // 全局导航守卫
router.beforeEach((to, from) => {
    console.log('from', from, 'to', to);
    if (to.path !== '/login') {
      const token = window.localStorage.getItem('token');
      if (!token) {
        return '/login'
      }
    }
  })
  export default router
