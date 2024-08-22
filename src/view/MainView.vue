<script lang="ts" setup="">
import UserStatistics from "@/layouts/UserStatistics.vue";
import CoinQuantity from "@/components/CoinQuantity.vue";
import {useUserStore} from "@/store/userStore.ts";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {useLevelStore} from "@/store/levelStore.ts";
import MainClicker from "@/components/MainClicker.vue";

const userStore = useUserStore();
const levelsStore = useLevelStore();
const earnedCoins = ref(0)

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
</script>

<template>
  <UserStatistics />
  <div class="main-page pink-content" v-if="userStore.user">
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
      <MainClicker @onTap="(value: number) => earnedCoins += value" />
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

</style>