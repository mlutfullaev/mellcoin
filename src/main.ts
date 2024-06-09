import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router.ts";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/style.scss'
import {createPinia} from "pinia";
import Tooltip from 'primevue/tooltip';

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(pinia)
  .directive('tooltip', Tooltip)
  .mount('#app')
