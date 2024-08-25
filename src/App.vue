<script setup lang="ts">
import Footer from "@/layouts/Footer.vue";
import {onMounted} from "vue";
import {useUserStore} from "./store/userStore";
import {useLevelStore} from "@/store/levelStore.ts";
import Toast from 'primevue/toast';
import {useWebAppTheme} from "vue-tg";
import {postEvent} from "@telegram-apps/sdk";

const userStore = useUserStore()
const levelsStore = useLevelStore()
const appTheme = useWebAppTheme()

onMounted(() => {
  userStore.fetchUserData()
  levelsStore.getLevels()
  appTheme.setBackgroundColor('#090327')
  appTheme.setHeaderColor('#090327')
  // postEvent('web_app_setup_swipe_behavior', {allow_vertical_swipe: false})
})
</script>

<template>
  <Toast />
  <router-view v-if="userStore.user" />
  <Footer v-if="userStore.user" />
</template>

<style scoped>
</style>