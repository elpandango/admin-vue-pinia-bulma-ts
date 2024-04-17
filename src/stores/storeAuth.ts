import {defineStore} from 'pinia';
import {deleteCookie, getCookie, setCookie} from '@/utils/helpers';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      token: null as string | null
    }
  },
  actions: {
    saveAuthToken(token: string): void {
      localStorage.setItem('token', token);
      setCookie('token', token, import.meta.env.VITE_APP_COOKIE_DOMAIN, 7);
      console.log('token in localstore is set');
      this.token = token;
    },
    removeAuthToken(): void {
      localStorage.removeItem('token');
      deleteCookie('token');
    }
  },
})
