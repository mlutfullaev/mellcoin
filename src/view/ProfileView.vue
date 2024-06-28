<script lang="ts" setup="">
import CoinQuantity from "@/components/CoinQuantity.vue";
import Hint from "@/components/Hint.vue";
import {onMounted, ref} from "vue";
// import multiTapImg from "@/assets/img/multiTapBig.png";
// import energyImg from "@/assets/img/energyBig.png";
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
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<template>
 <div class="profile-page">
   <p class="balance text">Your balance</p>
   <CoinQuantity :value="userStore.user?.balance" />
   <p class="how-works text">How the improvement works <Hint text="it works simply" /></p>
   <h2 class="subtitle">Free daily boosters</h2>
   <div class="cards">
     <div class="cards-item">
       <img src="@/assets/icons/lightning.svg" alt="lighting">
       <p class="bold text">Full energy</p>
       <span class="text">5/6 available</span>
     </div>
     <div class="cards-item">
       <img src="@/assets/icons/fire.svg" alt="fire">
       <p class="text bold">Turbo</p>
       <span class="text">Coming soon</span>
     </div>
   </div>
   <h2 class="subtitle" v-if="boosters.length">Boosters</h2>
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
            <span>• {{booster.max_lvl}} lvl</span>
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
    <p class="text pb-4">Increase the amount of coins you can earn per tap</p>
    <CircleImage
      :image="boosters[activeBooster].picture_url"
      :size="160"
      first-color="#B282FA2A"
      second-color="rgba(178, 130, 250, 0.1)"
    />
    <p class="modal-hint">+1 coin for tap for level 5</p>
    <CoinQuantity
      :value="Number(boosters[activeBooster].initial_cost)"
      :lvl="boosters[activeBooster].max_lvl"
    />
    <button @click="onBoost" class="btn">Go ahead</button>
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
  .cards {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    &-item {
      margin-bottom: 20px;
      padding: 8px;
      border-radius: 8px;
      background: #26154A;
      text-align: center;

      img {
        margin: 0 auto 20px;
        width: 60px;
      }
      span {
        color: #9C9E9B;
      }
    }
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