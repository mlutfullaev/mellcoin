<script setup lang="ts">
import Footer from "@/layouts/Footer.vue";
import {onMounted} from "vue";
import {useUserStore} from "./store/userStore";

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUserData()
})
</script>
<template>
<!--  <Header />-->
  <router-view v-if="userStore.user" />
  <Footer v-if="userStore.user" />
</template>

<style scoped>
</style>
