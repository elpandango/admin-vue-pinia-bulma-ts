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
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
  ]
});

router.beforeEach(async (to, from) => {
  const storeAuth = await useStoreAuth();
  console.log('storeAuth.token: ', storeAuth.token);
  if (!storeAuth.token && to.name !== 'auth') {
    return {name: 'auth'};
  }

  // if (storeAuth.token && to.name === 'auth') {
  //   return false;
  // }
  return;
});

export default router;
