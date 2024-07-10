<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {ICompletedTask, ITask} from "@/assets/types.ts";
import goldCoin from '@/assets/img/gold-coin.png'
import CoinQuantity from "@/components/CoinQuantity.vue";

const tasks = ref<ITask[]>([])
const completedTasks = ref<ICompletedTask[]>([])
const dailyTasks = ref<ICompletedTask[]>([])
// const dailyRewardModal = ref(false)

onMounted(() => {
  axios.get(`${API_URL}/task/daily`)
    .then(res => {
      dailyTasks.value = res.data.data
    })
  axios.get(`${API_URL}/task/list`)
    .then(res => {
      tasks.value = res.data.data
    })
  axios.get(`${API_URL}/user/task`)
    .then(res => {
      console.log(res.data)
      completedTasks.value = res.data.data
    })
})

const checkTask = (id: number) => {
  axios.get(`${API_URL}/task/${id}/check/`, {headers: {Accept: 'application/json'}})
    .then(res => {
      console.log(res.data)
    }
  )
}

const isCompleted = (id: number): boolean => {
  return completedTasks.value.some(task => task.id === id && task.completed_at)
}

// const onConfirmReward = () => {
  // dailyRewardModal.value = false
// }
</script>

<template>
 <div class="earn-page">
   <CircleImage
     :image="goldCoin"
     :size="160"
     second-color="#26154A"
     first-color="#B282FA1A"
   />
   <h1 class="title py-4">Earn more coins</h1>
   <h2 class="subtitle pb-2">Daily tasks</h2>
   <div
     v-if="dailyTasks.length"
     v-for="task in dailyTasks"
     class="small-card"
     @click="checkTask(task.id)"
     :key="task.id"
   >
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="text small-card-name">Daily Reward</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(task.task.reward).toFixed()}}
       </p>
     </div>
     <i :class="`pi ${task.completed_at ? 'pi-check-circle' : 'pi-arrow-right'}`" />
   </div>
   <h2 class="subtitle pt-5 pb-2">List of tasks</h2>
   <div
     class="small-card mb-2"
     v-for="task in tasks"
     :key="task.id"
     @click="checkTask(task.id)"
   >
     <img class="small-card-img" :src="task.image" alt="task">
     <div>
       <p class="text small-card-name">{{task.name}}</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(task.reward).toFixed()}}
       </p>
     </div>
     <i :class="`pi ${isCompleted(task.id) ? 'pi-check-circle' : 'pi-arrow-right'}`"></i>
   </div>
<!--   <Sidebar v-model:visible="dailyRewardModal" position="bottom" style="height: auto">-->
<!--     <CircleImage-->
<!--       :image="goldCoin"-->
<!--       :size="160"-->
<!--       second-color="#26154A"-->
<!--       first-color="#B282FA1A"-->
<!--     />-->
<!--     <h1 class="title pt-4 pb-2">Daily reward!</h1>-->
<!--     <p class="text pb-4">-->
<!--      You can get your daily reward now!-->
<!--     </p>-->
<!--     <CoinQuantity :value="20000" />-->
<!--     <button @click="onConfirmReward" class="btn">Get rewards!</button>-->
<!--   </Sidebar>-->
 </div>
</template>

<style lang="scss" scoped>
.earn-page {
  padding: 0 16px;
}
</style>