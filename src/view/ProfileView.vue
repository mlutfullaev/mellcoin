<script lang="ts" setup="">
import CoinQuantity from "@/components/CoinQuantity.vue";
import Hint from "@/components/Hint.vue";
import {ref} from "vue";
import multiTapImg from "@/assets/img/multiTapBig.png";
import energyImg from "@/assets/img/energyBig.png";
import CircleImage from "@/components/CircleImage.vue";

const multiTapModal = ref(false)
const energyModal = ref(false)
</script>

<template>
 <div class="profile-page">
   <p class="balance subtitle">Your balance</p>
   <CoinQuantity />
   <p class="how-works subtitle">How the improvement works <Hint text="it works simply" /></p>
   <h2 class="title">Free daily boosters</h2>
   <div class="cards">
     <div class="cards-item">
       <img src="@/assets/icons/lightning.svg" alt="lighting">
       <p class="bold subtitle">Full energy</p>
       <span class="subtitle">5/6 available</span>
     </div>
     <div class="cards-item">
       <img src="@/assets/icons/fire.svg" alt="fire">
       <p class="subtitle bold">Turbo</p>
       <span class="subtitle">Coming soon</span>
     </div>
   </div>
   <h2 class="title">Boosters</h2>
   <div class="boosters">
     <div class="small-card" @click="multiTapModal = true">
       <img class="small-card-img" src="@/assets/img/multitap.png" alt="multitap">
       <div>
          <p class="subtitle small-card-name">Multitap</p>
          <p class="subtitle bold small-card-prize">
            <img src="@/assets/icons/bitcoin.svg" alt="coin">
            16k
            <span>• 5 lvl</span>
          </p>
       </div>
       <i class="pi pi-arrow-right"></i>
     </div>
     <div class="small-card" @click="energyModal = true">
       <img class="small-card-img" src="@/assets/img/energy.png" alt="energy">
       <div>
          <p class="subtitle small-card-name">Energy Limit</p>
          <p class="subtitle bold small-card-prize">
            <img src="@/assets/icons/bitcoin.svg" alt="coin">
            16k
            <span>• 5 lvl</span>
          </p>
       </div>
       <i class="pi pi-arrow-right"></i>
     </div>
   </div>
 </div>
  <Sidebar v-model:visible="multiTapModal" position="bottom" style="height: auto">
    <h1 class="modal-title pb-2">Multitap</h1>
    <p class="subtitle pb-4">Increase the amount of coins you can earn per tap</p>
    <CircleImage
      :image="multiTapImg"
      :size="160"
      first-color="#B282FA2A"
      second-color="rgba(178, 130, 250, 0.1)"
    />
    <p class="modal-hint">+1 coin for tap for level 5</p>
    <CoinQuantity :value="16000" :lvl="5" />
    <button class="btn">Go ahead</button>
  </Sidebar>
  <Sidebar v-model:visible="energyModal" position="bottom" style="height: auto">
    <h1 class="modal-title pb-2">Energy limit</h1>
    <p class="subtitle pb-4">Increase the amount of energy</p>
    <CircleImage
      :image="energyImg"
      :size="160"
      first-color="#B282FA2A"
      second-color="rgba(178, 130, 250, 0.1)"
    />
    <p class="modal-hint">+500 energy points for level 5</p>
    <CoinQuantity :value="16000" :lvl="5" />
    <button class="btn">Go ahead</button>
  </Sidebar>
</template>

<style lang="scss" scoped>
.profile-page {
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