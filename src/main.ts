import { createApp } from 'vue'
import './assets/style.scss'
import App from './App.vue'
import {router} from "@/router.ts";
import PrimeVue from 'primevue/config';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app')
