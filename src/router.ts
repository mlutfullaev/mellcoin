import {createRouter, createWebHistory} from "vue-router";
import MainView from "@/view/MainView.vue";
import LevelsView from "@/view/LevelsView.vue";
import ProfileView from "./view/ProfileView.vue";
import MineView from "./view/MineView.vue";
import EarnView from "./view/EarnView.vue";
import FriendsView from "@/view/FriendsView.vue";
import AirdropView from "@/view/AirdropView.vue";

const routes = [
  { path: '/', component: MainView },
  { path: '/levels', component: LevelsView },
  { path: '/roadmap', component: AirdropView },
  { path: '/profile', component: ProfileView },
  { path: '/mine', component: MineView },
  { path: '/friends', component: FriendsView },
  { path: '/earn', component: EarnView },
  { path: '/:pathMatch(.*)*', redirect: '/'}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})