import {createRouter, createWebHistory} from "vue-router";
import MainView from "@/view/MainView.vue";
import LevelsView from "@/view/LevelsView.vue";

const routes = [
  { path: '/', component: MainView },
  { path: '/levels', component: LevelsView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})