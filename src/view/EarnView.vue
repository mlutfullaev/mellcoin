<script lang="ts" setup="">
import goldCoin from '@/assets/img/gold-coin.png'
import CircleImage from "@/components/CircleImage.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {ITask} from "@/assets/types.ts";

const tasks = ref<ITask[]>([])

onMounted(() => {
  axios.get(`${API_URL}/task/list`)
    .then(res => {
      tasks.value = res.data.data
    })
})

const checkTask = (id: number) => {
  console.log('check task')
  axios.get(`${API_URL}/task/${id}/check/`)
    .then(res => {
      console.log(res.data)
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
   <h2 class="subtitle pb-2">Daily tasks</h2>
   <div
     class="small-card mb-2"
     v-for="task in tasks"
     :key="task.id"
     @click="checkTask(task.id)"
   >
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="text small-card-name">{{task.name}}</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{task.reward}}
       </p>
     </div>
     <i class="pi pi-arrow-right"></i>
   </div>
   <h2 class="subtitle pt-5 pb-2">List of tasks</h2>
   <div class="small-card">
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="text small-card-name">Daily Reward</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +6 649 000
       </p>
     </div>
     <i class="pi pi-arrow-right"></i>
   </div>
 </div>
</template>

<style lang="scss" scoped>
.earn-page {
  padding: 0 16px;
}
</style>