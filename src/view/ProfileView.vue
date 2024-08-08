<script lang="ts" setup="">
import CoinQuantity from "@/components/CoinQuantity.vue";
import {onMounted, ref} from "vue";
import CircleImage from "@/components/CircleImage.vue";
import {useUserStore} from "@/store/userStore.ts";
import {IBoost} from "@/assets/types.ts";
import axios from "axios";
import {API_URL} from "@/main.ts";

const boosterModal = ref(false)
const boosters = ref<IBoost[]>([])
const activeBooster = ref(0)
const userStore = useUserStore()

onMounted(() => {
  axios.get(`${API_URL}/boost`)
    .then(res => {
      boosters.value = res.data.data
    })
})

const onBoost = () => {
  axios.post(`${API_URL}/boost/${boosters.value[activeBooster.value].id}`)
    .then(() => {
      boosterModal.value = false
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<template>
 <div class="profile-page">
   <p class="balance text">Ваш баланс</p>
   <CoinQuantity :value="userStore.user?.balance" />
<!--   <p class="how-works text">Как работает это улучшение <Hint text="it works simply" /></p>-->
   <h2 class="subtitle" v-if="boosters.length">Бусты</h2>
   <div class="boosters" v-if="boosters.length">
     <div
       class="small-card"
       v-for="(booster, i) in boosters"
       :key="booster.id"
       @click="boosterModal = true; activeBooster = i"
     >
       <img class="small-card-img" :src="booster.picture_url" alt="booster-picture">
       <div>
          <p class="text small-card-name">{{booster.name}}</p>
          <p class="text bold small-card-prize">
            <img src="@/assets/icons/bitcoin.svg" alt="coin">
            {{booster.initial_cost}}k
            <span>• {{booster.max_lvl}} уровень</span>
          </p>
       </div>
       <i class="pi pi-arrow-right"></i>
     </div>
   </div>
 </div>
  <Sidebar
    v-model:visible="boosterModal"
    position="bottom"
    style="height: auto"
  >
    <h1 class="title pb-2">{{boosters[activeBooster].name}}</h1>
    <p class="text pb-4">Увеличьте количество монет, которые вы можете заработать за одно нажатие</p>
    <CircleImage
      :image="boosters[activeBooster].picture_url"
      :size="160"
      first-color="#B282FA2A"
      second-color="rgba(178, 130, 250, 0.1)"
    />
    <p class="modal-hint">+1 монета за нажатие на 5-й уровень</p>
    <CoinQuantity
      :value="Number(boosters[activeBooster].initial_cost)"
      :lvl="boosters[activeBooster].max_lvl"
    />
    <button @click="onBoost" class="btn">Получить</button>
  </Sidebar>
</template>

<style lang="scss" scoped>
.profile-page {
  padding: 0 16px;

  .balance {
    text-align: center;
    color: #9C9E9B;
  }
  .how-works {
    text-align: center;
    color: #B282FA;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
  }
  .boosters {
    margin: 10px 0;
    display: grid;
    gap: 8px;

    .small-card {
      cursor: pointer;

      &-prize span {
        color: #9C9E9B;
        font-weight: 400;
      }
    }
  }
}
</style>