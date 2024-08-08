<script lang="ts" setup="">

import UserStatistics from "@/layouts/UserStatistics.vue";
import CoinQuantity from "@/components/CoinQuantity.vue";
import Hint from "@/components/Hint.vue";
import {onMounted, ref} from "vue";
import Staking from "@/components/Staking.vue";
import Casino from "@/components/Casino.vue";
import {useUserStore} from "@/store/userStore.ts";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {IBoost} from "@/assets/types.ts";
import {formatWithPrefix} from "../assets/helpers.ts";

const tabMenu = ref([
  { label: 'Стейкинг' },
  { label: 'Казино' },
  { label: 'Карточки' },
])

const activeMenu = ref(0)
const userStore = useUserStore()
const prize = ref<null | IBoost>(null)

const getPrize = () => {
  axios.get(`${API_URL}/prize`)
    .then(res => {
      const data = { ...res.data.data, date: new Date().getTime() }
      localStorage.setItem("prize", JSON.stringify(data))
      prize.value = data
    })
}

onMounted(() => {
  const prizeJson = localStorage.getItem("prize")
  if (!prizeJson) return

  const prizeLS = JSON.parse(prizeJson)
  if (!prizeLS) return

  const now = new Date().getTime()
  const passed = now - prizeLS.date
  if (passed < 24 * 60 * 60 * 1000) {
    prize.value = prizeLS
  } else {
    localStorage.removeItem("prize")
  }
})
</script>

<template>
  <UserStatistics />
 <div class="mine-page pink-content">
   <CoinQuantity :value="userStore.user?.balance" />
   <p class="text coin-time">00:50:00 <Hint text="This is hint" /></p>
   <TabMenu
     :model="tabMenu"
     @tabChange="(value: any) => activeMenu = value.index"
   />
   <Staking v-if="tabMenu[activeMenu].label === 'Стейкинг'" />
   <div class="cards" v-if="tabMenu[activeMenu].label === 'Карточки'">
     <div class="cards-item" v-if="prize">
       <img src="@/assets/img/gift.png" alt="gift">
       <h2 class="subtitle mb-2">Ты получил буст!</h2>
       <p class="text mb-2">{{prize.name}}</p>
       <p class="text mb-1.5"><span class="grey">стоимость: </span>{{formatWithPrefix(prize.initial_cost)}}</p>
       <p class="text"><span class="grey">макс. уровень: </span>{{prize.max_lvl}}</p>
     </div>
     <div class="cards-item" v-else>
       <img src="@/assets/img/gift.png" alt="gift">
       <h2 class="subtitle mb-3">Карта дня</h2>
       <p class="text mb-2">Откройте подарок и получите один из многочисленных призов!</p>
       <button @click="getPrize" class="btn">Открыть</button>
     </div>
   </div>
   <Casino v-if="tabMenu[activeMenu].label === 'Казино'" />
 </div>
</template>

<style lang="scss" scoped>
.mine-page {
  .coin-time {
    color: #9C9E9B;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: right;
    padding: 5px 0 10px
  }
  .cards {
    display: grid;
    gap: 8px;
    min-height: 300px;
    align-items: start;
    margin: 20px 0;

    &-item {
      display: grid;
      grid-template-columns: 68px 1fr;
      align-items: center;
      grid-column-gap: 12px;
      padding: 28px;
      border-radius: 12px;
      background: #10001D;

      img {
        grid-row: 1 / 5;
      }
    }
  }
}
</style>