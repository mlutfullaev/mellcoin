<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {IFullTask} from "@/assets/types.ts";
import goldCoin from '@/assets/img/gold-coin.png'

const tasks = ref<IFullTask[]>([])
const dailyTasks = ref<IFullTask[]>([])
// const dailyRewardModal = ref(false)

onMounted(() => {
  axios.get(`${API_URL}/task/daily`)
    .then(res => {
      dailyTasks.value = res.data.data
    })
  // axios.get(`${API_URL}/task/list`)
  //   .then(res => {
  //     tasks.value = res.data.data
  //   })
  axios.get(`${API_URL}/user/task`)
    .then(res => {
      console.log(res.data)
      tasks.value = res.data.data
    })
})

const checkTask = (id: number) => {
  axios.get(`${API_URL}/task/check/${id}`, { headers: {Accept: 'application/json'} })
    .then(res => {
      const updatedTask = res.data.data as IFullTask
      console.log(updatedTask)
      tasks.value = tasks.value.map(task => task.id === updatedTask.id ? updatedTask : task)
    }
  )
}

const checkDailTask = (id: number) => {
  axios.get(`${API_URL}/task/check/${id}`, { headers: {Accept: 'application/json'} })
    .then(res => {
      const updatedTask = res.data.data as IFullTask
      console.log(updatedTask)
      dailyTasks.value = dailyTasks.value.map(task => task.id === updatedTask.id ? updatedTask : task)
    }
  )
}
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
   <h2 class="subtitle" v-if="dailyTasks.length">Daily tasks</h2>
   <div
     v-if="dailyTasks.length"
     v-for="task in dailyTasks"
     class="small-card mt-2"
     @click="task.completed_at ? null : checkDailTask(task.task_id)"
     :key="task.task_id"
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
   <h2 class="subtitle pt-5 pb-2" v-if="tasks.length">List of tasks</h2>
   <div
     class="small-card mb-2"
     v-for="task in tasks"
     :key="task.id"
     @click="task.completed_at ? null : checkTask(task.task_id)"
   >
     <img class="small-card-img" :src="task.task.image" alt="task">
     <div>
       <p class="text small-card-name">{{task.task.name}}</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(task.task.reward).toFixed()}}
       </p>
     </div>
     <i :class="`pi ${task.completed_at ? 'pi-check-circle' : 'pi-arrow-right'}`"></i>
   </div>
   <div class="notfound mb-4" v-if="!tasks.length && !dailyTasks.length">
     There is no task yet
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