<script lang="ts" setup="">
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

</script>

<template>
 <header>
    <button v-if="route.path === '/'">
      <i class="pi pi-times"></i>
    </button>
    <button v-else @click="router.push('..')">
      <i class="pi pi-arrow-left"></i>
    </button>
   <h2>MEL COIN</h2>
   <button>
     <i class="pi pi-ellipsis-v" />
   </button>
 </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;

  button {
    color: #fff;
  }
  h2 {
    font-size: 16px;
    font-weight: 600;
    width: 100%
  }
}
</style>