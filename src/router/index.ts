import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostsView from "@/views/PostsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostsView
    },
    {
      path: '/add-post',
      name: 'add-post',
      component: () => import('../views/AddPostView.vue')
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: () => import('../views/EditPostView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
  ]
});

router.beforeEach((to, from) => {
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
