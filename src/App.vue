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
  <router-view />
  <Footer />
</template>

<style scoped>
</style>
