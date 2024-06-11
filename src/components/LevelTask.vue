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
 <div class="level-task">
   <div class="level-task-img" :style="{ backgroundImage: `url('${img}')` }"></div>
   <div class="level-task-body">
     <p class="level-task-name">{{ title }}</p>
     <p class="level-task-prize"><img src="@/assets/icons/bitcoin.svg" alt="coin">{{ formatCoin(prize) }}</p>
   </div>
   <img v-if="completed" src="@/assets/icons/completed.svg" alt="completed">
   <p v-else class="level-task-queue">{{queue}}</p>
 </div>
</template>

<style lang="scss" scoped>
.level-task {
  background: #26154A;
  padding: 8px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;

  &-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &-name {
    font-size: 12px;
    font-weight: 400;
    padding-bottom: 5px;
  }
  &-prize {
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;

    img {
      padding-right: 10px;
      width: 22px;
    }
  }
  &-queue {
    font-size: 24px;
    font-weight: 700;
    color: #5F507E;
    padding-right: 5px;
  }
}
</style>