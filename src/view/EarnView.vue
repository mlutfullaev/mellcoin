<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {IFullTask, ITask} from "@/assets/types.ts";
import goldCoin from '@/assets/img/gold-coin.png'
import calendar from '@/assets/img/calendar.png'
import {useUserStore} from "@/store/userStore.ts";

const userStore = useUserStore()
const tasks = ref<IFullTask[]>([])
const dailyTask = ref<IFullTask | null>(null)
const calendarTasks = ref<ITask[]>([])
const calendarActiveTask = ref(0)
const dailyRewardModal = ref(false)

onMounted(async () => {
  axios.get(`${API_URL}/user/task`)
    .then(res => {
      tasks.value = res.data.data
    })
  await axios.get(`${API_URL}/task/daily`)
    .then(res => {
      dailyTask.value = res.data.data
    })
  if (!dailyTask.value) {
    axios.get(`${API_URL}/task/daily_calendar`)
      .then(res => {
        calendarTasks.value = res.data.data
        dailyRewardModal.value = true
        let i = 0
        while (true) {
          if (!calendarTasks.value[i].is_active || i === calendarTasks.value.length - 1) {
            calendarActiveTask.value = i
            break;
          }
          i++
        }
      })
  }
})

const checkTask = (id: number) => {
  axios.get(`${API_URL}/task/check/${id}`)
    .then(res => {
      const updatedTask = res.data.data as IFullTask
      tasks.value = tasks.value.map(task => task.id === updatedTask.id ? updatedTask : task)
    }
  )
}

const onConfirmReward = () => {
  axios.post(`${API_URL}/user/task/`, {
    id: calendarTasks.value[calendarActiveTask.value].id
  })
    .then(res => {
      userStore.fetchUserData()
      dailyTask.value = res.data.data
      dailyRewardModal.value = false
    })
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
   <h2 class="subtitle" v-if="dailyTask">Daily tasks</h2>
   <div
     v-if="dailyTask"
     class="small-card mt-2"
     style="cursor: auto;"
     :key="dailyTask.task_id"
   >
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="text small-card-name">Daily Reward</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(dailyTask.task.reward).toFixed()}}
       </p>
     </div>
     <i class="pi pi-check-circle"></i>
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
   <div class="notfound mb-4" v-if="!tasks.length && !dailyTask">
     There is no task yet
   </div>
   <Sidebar v-model:visible="dailyRewardModal" position="bottom" style="height: auto">
     <CircleImage
       :image="calendar"
       :size="160"
       second-color="#26154A"
       first-color="#B282FA1A"
     />
     <h1 class="title pt-4 pb-2">Daily reward!</h1>
     <p class="text pb-4">Accrue coins for logging into the game daily without skipping</p>
      <div class="prizes pb-4">
        <div
          class="prizes-item"
          v-for="(task, index) in calendarTasks"
          :key="task.id"
          :class="{ claimed: task.is_active, active: index === calendarActiveTask}"
        >
          <p class="date">Day {{index + 1}}</p>
          <img src="@/assets/icons/bitcoin.svg" alt="coin">
          <p class="prize bold">{{Number(task.reward).toFixed()}}</p>
        </div>
      </div>
     <button @click="onConfirmReward" class="btn">Get reward!</button>
   </Sidebar>
 </div>
</template>

<style lang="scss" scoped>
.earn-page {
  padding: 0 16px;
}
.prizes {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  &-item {
    background: rgba(38, 21, 74, 1);
    padding: 5px;
    border-radius: 10px;
    text-align: center;
    opacity: .7;

    &.claimed {
      background: #B282FA;
    }
    &.active {
      opacity: 1;
      border: 1px solid #B282FA;
    }
    img {
      width: 24px;
      margin: 0 auto;
    }
    .date {
      font-size: 12px;
      padding-bottom: 4px;
    }
    .prize {
      font-size: 16px
    }
  }
}
</style>