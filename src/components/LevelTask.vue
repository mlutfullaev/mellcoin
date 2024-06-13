<script lang="ts" setup="">
import {formatCoin} from "@/assets/helpers.ts";

defineProps<{
  title: string,
  prize: number,
  img: string,
  queue: number,
  completed: boolean
}>()
</script>

<template>
 <div class="small-card">
   <div class="small-card-img" :style="{ backgroundImage: `url('${img}')` }"></div>
   <div class="small-card-body">
     <p class="text small-card-name">{{ title }}</p>
     <p class="text bold small-card-prize"><img src="@/assets/icons/bitcoin.svg" alt="coin">{{ formatCoin(prize) }}</p>
   </div>
   <img v-if="completed" src="@/assets/icons/completed.svg" alt="completed">
   <p v-else class="title small-card-queue pr-2">{{queue}}</p>
 </div>
</template>

<style lang="scss" scoped>
.small-card {
  &-queue {
    color: #5F507E;
  }
}
</style>