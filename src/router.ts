import {createRouter, createWebHistory} from "vue-router";
import MainView from "@/view/MainView.vue";
import LevelsView from "@/view/LevelsView.vue";
import ProfileView from "./view/ProfileView.vue";
import MineView from "./view/MineView.vue";
import EarnView from "./view/EarnView.vue";

const routes = [
  { path: '/', component: MainView },
  { path: '/levels', component: LevelsView },
  { path: '/profile', component: ProfileView },
  { path: '/mine', component: MineView },
  { path: '/earn', component: EarnView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})