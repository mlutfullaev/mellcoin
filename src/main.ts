import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router.ts";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/styles/index.scss'
import ToastService from 'primevue/toastservice';
import {createPinia} from "pinia";
import Tooltip from 'primevue/tooltip';
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export const API_URL = import.meta.env.VITE_APP_URL

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(pinia)
  .use(ToastService)
  .directive('tooltip', Tooltip)
  .mount('#app')
