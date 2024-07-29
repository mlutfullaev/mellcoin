<script setup lang="ts">
import Footer from "@/layouts/Footer.vue";
import {onMounted} from "vue";
import {useUserStore} from "./store/userStore";
import {useLevelStore} from "@/store/levelStore.ts";
import Toast from 'primevue/toast';

const userStore = useUserStore()
const levelsStore = useLevelStore()

onMounted(() => {
  userStore.fetchUserData()
  levelsStore.getLevels()
})
</script>

<template>
  <Toast />
  <router-view v-if="userStore.user" />
  <Footer v-if="userStore.user" />
</template>

<style scoped>
</style>