<script lang="ts" setup="">
import UserStatistics from "@/layouts/UserStatistics.vue";
import CircleImage from "@/components/CircleImage.vue";
import MainImage from '@/assets/img/main-circle.gif'
import CoinQuantity from "@/components/CoinQuantity.vue";
import {useUserStore} from "@/store/userStore.ts";
import {computed, onMounted, ref} from "vue";
import { uuid } from 'vue-uuid'
import axios from "axios";
import {API_URL} from "@/main.ts";
import {useLevelStore} from "@/store/levelStore.ts";

interface FloatingText {
  x: number;
  y: number;
  id: string
  message: string;
}
const userStore = useUserStore();
const levelsStore = useLevelStore();
const floatingTexts = ref<FloatingText[]>([]);
const earnedCoins = ref(0)

const onTap = (event: TouchEvent | MouseEvent) => {
  const coin = Number(userStore.user?.level) + 2
  const message = '+' + coin
  const newText: FloatingText = {
    x: 0,
    y: 0,
    id: uuid.v1(),
    message,
  }

  if (event instanceof MouseEvent) {
    newText.x = event.clientX
    newText.y = event.clientY
  } else if (event instanceof TouchEvent) {
    const touch = event.touches[0]
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    newText.x = touch.clientX + rect.left
    newText.y = touch.clientY + rect.top
  }

  floatingTexts.value.push(newText)

  earnedCoins.value += coin

  setTimeout(() => {
    floatingTexts.value = floatingTexts.value.filter(text => text.id !== newText.id)
  }, 2000)
};

const postCoins = () => {
  if (!earnedCoins.value) return
  axios.post(`${API_URL}/user/tap`, {
    count: earnedCoins.value
  })
    .then(res => {
      userStore.setUser(res.data.data)
      earnedCoins.value = 0
    })
}

const levelProgressPercent = computed(() => {
  const from = Number(userStore.user?.balance)
  const to = Number(levelsStore.levels[Number(userStore.user?.level) + 1].money)
  return from / to * 100
})

onMounted(() => {
  const interval = setInterval(postCoins, 5000)

  return () => {
    clearInterval(interval)
    postCoins()
  }
})

const handleBeforeUnload = () => {
  if (!earnedCoins.value) return
  localStorage.setItem('opened_count', earnedCoins.value + '')
};

onMounted(() => {
  const lsCount = Number(localStorage.getItem('opened_count'))
  if (lsCount) {
    earnedCoins.value = lsCount
  }
  localStorage.removeItem('opened_count')
  window.onbeforeunload = handleBeforeUnload;
});
</script>

<template>
  <UserStatistics />
  <div class="main-page pink-content" v-if="userStore.user">
    <div
      v-for="text in floatingTexts"
      :key="text.id"
      class="floating-text"
      :style="{ top: `${text.y}px`, left: `${text.x}px` }">
      {{ text.message }}
    </div>
    <div class="level">
      <RouterLink to="/levels">
        {{levelsStore.levels[userStore.user.level].label}} <i class="pi pi-arrow-right"></i>
      </RouterLink>
      <p><span>Уровень </span>{{userStore.user.level + 1}}/{{levelsStore.levels.length}}</p>
    </div>
    <ProgressBar
      v-if="levelsStore.levels.length > Number(userStore.user.level) + 1"
      :showValue="false"
      :value="levelProgressPercent"
    />
    <div class="content">
      <CircleImage
        :image="MainImage"
        :size="300"
        second-color="#26154A"
        first-color="#090327"
        :click="onTap"
      />
      <CoinQuantity :value="Number(userStore.user.balance) + earnedCoins" />
      <router-link to="/profile" class="btn">
        <img src="@/assets/icons/shuttle.svg" alt="shuttle">
        Буст
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  .floating-text {
    position: absolute;
    transform: translate(-50%, 0);
    transition: all 2s ease-in-out;
    animation: floating 2s;
    pointer-events: none;
    font-size: 25px;
    font-weight: 700
  }
  .level {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    font-weight: 400;
    font-size: 12px;

    a {
      display: flex;
      gap: 8px;
      align-items: center;

      i {
        font-size: 12px
      }
    }
    p {
      span {
        color: #9C9E9B;
        padding-right: 10px;
      }
    }
  }

  .content {
    padding: 20px 0 10px;
  }
}

@keyframes floating {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>