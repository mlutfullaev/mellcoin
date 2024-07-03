<script lang="ts" setup="">
import {ref} from "vue";

const checking = ref(false)

const refresh = () => {
  checking.value = true
  setTimeout(() => {
    checking.value = false
  }, 2000)
}
</script>

<template>
 <div class="friends-page">
  <h1 class="title pb-2">Invite your friends!</h1>
   <p class="text pb-4">You and your friend will receive bonuses</p>
   <div class="cards">
     <div class="cards-item">
       <img src="@/assets/img/1.png" alt="one">
       <p class="text bold pt-3 pb-2">1 level</p>
       <p>
         <img src="@/assets/icons/discount.svg" alt="discount">
         <span class="bold pink">5%</span>
         <span class="grey">from income</span>
       </p>
     </div>
     <div class="cards-item">
       <img src="@/assets/img/2.png" alt="two">
       <p class="text bold pt-3 pb-2">2 level</p>
       <p>
         <img src="@/assets/icons/discount.svg" alt="discount">
         <span class="bold pink">3%</span>
         <span class="grey">from income</span>
       </p>
     </div>
   </div>
   <button>More bonuses</button>
   <h2 class="subtitle py-4 flex justify-between">
     A list of your friends
     <button @click="refresh" :class="{'spin': checking}"><i class="pi pi-refresh" /></button>
   </h2>
   <div class="friends-notfound mb-4">
     You haven't invited anyone yet
   </div>
   <div class="friend-list">
     <div class="small-card">
       <img class="small-card-img" src="@/assets/img/avatar.png" alt="avatar">
       <div>
         <p class="text small-card-name">Nickname</p>
         <p class="text bold small-card-prize">
           <span>5 lvl •</span>
           <img src="@/assets/icons/bitcoin.svg" alt="coin">
           16k
         </p>
       </div>
       <p class="subtitle flex gap-1">
         <img src="@/assets/icons/bitcoin.svg" alt="coin" width="20">
         +25K
       </p>
     </div>
   </div>
   <div class="friends-buttons">
      <button class="btn">Invite a friend <i class="pi pi-users"></i></button>
      <button class="btn"><i class="pi pi-copy"></i></button>
   </div>
 </div>
</template>

<style lang="scss" scoped>
.friends-page {
  padding: 0 16px;

  .cards {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    &-item {
      padding: 20px;
      border-radius: 8px;
      background: #26154A;
      text-align: center;

      p {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
      }
      img {
        width: max-content;
        display: inline;
      }
    }
  }
  > button {
    border: 1px solid #B282FA;
    color: #B282FA;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 700;
    font-size: 16px;
    transition: .3s;
    display: block;
    width: max-content;
    margin: 0 auto;

    &:hover {
      background: #B282FA;
      color: #fff;
    }
  }
  .friends-notfound {
    background: #1E072F;
    border-radius: 12px;
    text-align: center;
    padding: 30px 10px;
    color: #9C9E9B;
    font-size: 12px;
  }
  .friend-list {
    display: grid;
    gap: 8px;
    min-height: 300px;
    align-items: start;
  }
  .friends-buttons {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
  }
  .spin {
    transform: rotate(0deg);
    animation: spin .7s linear infinite;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>