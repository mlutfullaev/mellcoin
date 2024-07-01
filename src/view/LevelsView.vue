<script lang="ts" setup="">
import {useUserStore} from "@/store/userStore.ts";
import {onMounted, ref} from "vue";
import CircleImage from "@/components/CircleImage.vue";
import LevelTask from "@/components/LevelTask.vue";
import {levels} from "@/assets/data.ts";

const userStore = useUserStore()
const currentLevel = ref(0)
const userLevel = ref(0)

onMounted(() => {
  getLevel()
})

const getLevel = () => {
  let level = 3
  // for (let i = levels.length - 1; i >= 0; i--) {
  //   if (userStore.user?.balance >= levels[i].from) {
  //     level = i
  //     break
  //   }
  // }
  currentLevel.value = level
  userLevel.value = level
}
const formatNumber = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B+';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};
</script>

<template>
 <div class="levels-page">
  <div class="top-slider">
    <Button
      :disabled="currentLevel === 0"
      @click="currentLevel = currentLevel - 1"
      icon="pi pi-arrow-left"
    />
    <CircleImage
      :image="levels[currentLevel].img"
      :size="160"
      :second-color="currentLevel === userLevel ? '#B282FA' : '#26154A'"
      :first-color="currentLevel === userLevel ? '#B282FA80' : '#B282FA1A'"
    />
    <Button
      :disabled="currentLevel === levels.length - 1"
      @click="currentLevel = currentLevel + 1"
      icon="pi pi-arrow-right"
    />
  </div>
   <h1 class="title pb-4">{{levels[currentLevel].title}}</h1>
   <div v-if="userLevel === currentLevel">
     <p class="bold">24.54K / 100K</p>
     <ProgressBar :showValue="false" :value="34" />
   </div>
    <p v-else>frome {{ formatNumber(levels[currentLevel].from) }}</p>
   <div class="assignments">
     <h2 class="subtitle assignments-title">Level Assignments</h2>
     <LevelTask
       v-for="(task, i) in levels[currentLevel].tasks"
       :key="task.id"
       :title="task.name"
       :prize="26653"
       :queue="i + 1"
       :completed="false"
       :img="levels[currentLevel].img"
     />
   </div>
 </div>
</template>

<style lang="scss" scoped>
.levels-page {
  color: #fff;
  padding: 0 16px;

  .top-slider {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  p {
    text-align: center;
    font-size: 12px;
    padding-bottom: 5px;
  }

  .assignments {
    padding-top: 20px;
    display: grid;
    grid-row-gap: 8px;

    &-title {
      padding-bottom: 4px;
    }
  }
}
</style>