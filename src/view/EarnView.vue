<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {EStatus, IFullTask, ITask} from "@/assets/types.ts";
import goldCoin from '@/assets/img/gold-coin.png'
import calendar from '@/assets/img/calendar.png'
import {useUserStore} from "@/store/userStore.ts";
import {useToast} from "primevue/usetoast";

const userStore = useUserStore()
const tasks = ref<IFullTask[]>([])
const dailyTask = ref<IFullTask | null>(null)
const calendarTasks = ref<ITask[]>([])
const calendarActiveTask = ref(0)
const dailyRewardModal = ref(false)
const loading = ref(false)
const toast = useToast()

onMounted(async () => {
  axios.get(`${API_URL}/user/task`)
    .then(res => {
      tasks.value = res.data.data
    })
  await axios.get(`${API_URL}/task/daily`)
    .then(res => {
      dailyTask.value = res.data.data
    })
  if (dailyTask.value && !dailyTask.value.task.is_active) {
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
const handleTask = (task: IFullTask) => {
  if (task.status === EStatus.IN_PROGRESS) {
    axios.get(`${API_URL}/task/check/${task.task.id}`)
      .then(res => {
          const updatedTask = res.data.data as IFullTask
          tasks.value = tasks.value.map(task => task.id === updatedTask.id ? updatedTask : task)
          toast.add({ severity: 'success', detail: 'Задача выполнено!', life: 5000 });
        }
      )
  } else {
    if (task.task.approve_requirements.url) {
      window.location.href = task.task.approve_requirements.url
    }
  }
}

const onConfirmReward = () => {
  loading.value = true
  axios.post(`${API_URL}/user/task/`, {
    id: calendarTasks.value[calendarActiveTask.value].id
  })
    .then(() => {
      userStore.fetchUserData()
      if (!dailyTask.value) return
      dailyTask.value = {
        ...dailyTask.value,
        task: {
          ...dailyTask.value?.task,
          is_active: true
        }
      }
      loading.value = false
      dailyRewardModal.value = false
      toast.add({ severity: 'success', detail: 'Ежедневная награда получено!', life: 5000 });
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
   <h1 class="title py-4">Зарабатывайте больше монет</h1>
   <h2 class="subtitle" v-if="dailyTask">Ежедневные задачи</h2>
   <div
     v-if="dailyTask"
     class="small-card mt-2"
     style="cursor: auto;"
     :key="dailyTask.task_id"
   >
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="text small-card-name">Ежедневная награда</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(dailyTask.task.reward).toFixed()}}
       </p>
     </div>
     <i class="pi pi-check-circle" :class="dailyTask.task.is_active ? 'pi-check-circle' : 'pi-arrow-right'"></i>
   </div>
   <h2 class="subtitle pt-5 pb-2" v-if="tasks.length">Список задач</h2>
   <div
     class="small-card mb-2"
     v-for="task in tasks"
     :key="task.id"
     @click="handleTask(task)"
   >
     <img class="small-card-img" :src="task.task.image" alt="task">
     <div>
       <p class="text small-card-name">{{task.task.name}}</p>
       <p class="text bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +{{Number(task.task.reward).toFixed()}}
       </p>
     </div>
     <i :class="`pi ${task.status === EStatus.COMPLETED ? 'pi-check-circle' : 'pi-arrow-right'}`"></i>
   </div>
   <div class="notfound mb-4" v-if="!tasks.length && !dailyTask">
     Пока нет никакой задачи
   </div>
   <Sidebar v-model:visible="dailyRewardModal" position="bottom" style="height: auto">
     <CircleImage
       :image="calendar"
       :size="160"
       second-color="#26154A"
       first-color="#B282FA1A"
     />
     <h1 class="title pt-4 pb-2">Ежедневная награда!</h1>
      <div class="prizes pb-4">
        <div
          class="prizes-item"
          v-for="(task, index) in calendarTasks"
          :key="task.id"
          :class="{ claimed: task.is_active, active: index === calendarActiveTask}"
        >
          <p class="date">Day {{index + 1}}</p>
          <p class="prize">
            <img src="@/assets/icons/bitcoin.svg" alt="coin">
            {{Number(task.reward).toFixed()}}
          </p>
        </div>
      </div>
     <button :disabled="loading" @click="onConfirmReward" class="btn">Получи награду!</button>
   </Sidebar>
 </div>
</template>

<style lang="scss" scoped>
.earn-page {
  padding: 0 16px;
}
.prizes {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);

  &-item {
    background: rgba(38, 21, 74, 1);
    padding: 4px;
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
      width: 14px;
    }
    .date {
      font-size: 9px;
    }
    .prize {
      font-size: 14px;
      display: flex;
      justify-content: center;
      gap: 5px;
    }
  }
}
</style>