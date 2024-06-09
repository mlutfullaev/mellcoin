import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router.ts";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/style.scss'

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app')
