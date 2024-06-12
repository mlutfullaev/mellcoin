<script lang="ts" setup="">
import goldCoin from '@/assets/img/gold-coin.png'
import CircleImage from "@/components/CircleImage.vue";
</script>

<template>
 <div class="earn-page">
   <CircleImage
     :image="goldCoin"
     :size="160"
     second-color="#26154A"
     first-color="#B282FA1A"
   />
   <h1 class="py-4 text-center">Earn more coins</h1>
   <h2 class="title pb-2">Daily tasks</h2>
   <div class="small-card">
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="subtitle small-card-name">Daily Reward</p>
       <p class="subtitle bold small-card-prize">
         <img src="@/assets/icons/bitcoin.svg" alt="coin">
         +6 649 000
       </p>
     </div>
     <i class="pi pi-arrow-right"></i>
   </div>
   <h2 class="title pt-5 pb-2">List of tasks</h2>
   <div class="small-card">
     <img class="small-card-img" src="@/assets/img/task.png" alt="task">
     <div>
       <p class="subtitle small-card-name">Daily Reward</p>
       <p class="subtitle bold small-card-prize">
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
  h1 {
    font-size: 24px;
    font-weight: 700;
  }
}
</style>