<script lang="ts" setup="">
import {computed, ref} from "vue";
import CircleImage from "@/components/CircleImage.vue";
import LevelTask from "@/components/LevelTask.vue";
import {LevelTasks} from "@/assets/data.ts";
import {useUserStore} from "@/store/userStore.ts";
import {formatWithPrefix} from "@/assets/helpers.ts";
import {useLevelStore} from "@/store/levelStore.ts";

const userStore = useUserStore()
const levelsStore = useLevelStore()

// const userStore = useUserStore()
const currentLevel = ref(userStore.user ? userStore.user.level  - 1 : 0)
const userLevel = ref(0)

const levelProgressText = computed(() => {
  if (!userStore.user) return
  const from = userStore.user?.balance
  let text = `${formatWithPrefix(from)}`
  if (levelsStore.levels[currentLevel.value + 1]) {
    text += ` / ${formatWithPrefix(levelsStore.levels[currentLevel.value + 1].money)}`
  }
  return text
})

const levelProgressPercent = computed(() => {
  const from = Number(userStore.user?.balance)
  const to = Number(levelsStore.levels[currentLevel.value + 1].money)
  return from / to * 100
})

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
 <div class="levels-page" v-if="levelsStore.levels.length">
  <div class="top-slider">
    <Button
      :disabled="currentLevel === 0"
      @click="currentLevel = currentLevel - 1"
      icon="pi pi-arrow-left"
    />
    <CircleImage
      :image="levelsStore.levels[currentLevel].image"
      :size="160"
      :second-color="currentLevel === userLevel ? '#B282FA' : '#26154A'"
      :first-color="currentLevel === userLevel ? '#B282FA80' : '#B282FA1A'"
    />
    <Button
      :disabled="currentLevel === levelsStore.levels.length - 1"
      @click="currentLevel = currentLevel + 1"
      icon="pi pi-arrow-right"
    />
  </div>
   <h1 class="title pb-4">{{levelsStore.levels[currentLevel].name}}</h1>
   <div v-if="userLevel === currentLevel">
     <p class="bold">{{levelProgressText}}</p>
     <ProgressBar v-if="levelsStore.levels[currentLevel + 1]" :showValue="false" :value="levelProgressPercent" />
   </div>
    <p v-else>frome {{ formatNumber(levelsStore.levels[currentLevel].money) }}</p>
   <div class="assignments">
     <h2 class="subtitle assignments-title">Level Assignments</h2>
     <LevelTask
       v-for="(task, i) in LevelTasks"
       :key="task.id"
       :title="task.name"
       :prize="26653"
       :queue="i + 1"
       :completed="false"
       :img="levelsStore.levels[currentLevel].image"
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