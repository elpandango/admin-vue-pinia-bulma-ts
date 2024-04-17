import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {useStoreAuth} from "@/stores/storeAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-post',
      name: 'add-post',
      component: () => import('../views/AddEditPostView.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostsView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
  ]
});

router.beforeEach((to, from) => {
  const storeAuth = useStoreAuth();
  // console.log('localStorage.getItem(\'token\'): ', localStorage.getItem('token'));
  const token = localStorage.getItem('token');
  if (!token && to.name !== 'auth') {
    return {name: 'auth'};
  }

  if (token && to.name === 'auth') {
    return {name: 'home'};
  }
  return;
});

export default router;
