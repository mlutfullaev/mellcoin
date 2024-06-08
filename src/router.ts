import {createMemoryHistory, createRouter} from "vue-router";
import MainView from "@/view/MainView.vue";

const routes = [
  { path: '/', component: MainView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})